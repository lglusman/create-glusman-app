Imports System.Configuration
Imports System.Data.SqlClient
Imports System.IO
Imports System.Reflection
Imports Connection

Public Class Form1

    Public Structure Columna
        Property columna As String
        Property nulable As Boolean
        Property foreing As String
        Property componente As String
        Property tipo As String

    End Structure

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        chk.DataSource = traerTablas()
        chk.DisplayMember = "tabla"
        chk.ValueMember = "tabla"

    End Sub

    Private Function traerTablas() As DataTable
        Dim pa As New parametrosArray
        Dim ds As DataSet = Connection.Connection.Traer("usp_getTables", pa)
        If ds.Tables.Count > 0 Then
            Return ds.Tables(0)
        End If
        Return Nothing
    End Function

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Try
            Dim ret As DialogResult = FolderBrowserDialog1.ShowDialog()
            If ret = Windows.Forms.DialogResult.OK Then
                Dim path = FolderBrowserDialog1.SelectedPath
                If Not System.IO.Directory.Exists(path + "\dtos") Then
                    System.IO.Directory.CreateDirectory(path + "\dtos")
                End If
                If Not System.IO.Directory.Exists(path + "\controllers") Then
                    System.IO.Directory.CreateDirectory(path + "\controllers")
                End If
                If Not System.IO.Directory.Exists(path + "\typescript") Then
                    System.IO.Directory.CreateDirectory(path + "\typescript")
                Else
                    If System.IO.File.Exists(path + "\typescript\types.d.ts") Then
                        System.IO.File.Delete(path + "\typescript\types.d.ts")
                    End If
                End If
                For Each drv As DataRowView In chk.CheckedItems
                    Dim str As String = drv.Row(0)
                    Dim plural As String = drv.Row(1)
                    Dim singular As String = drv.Row(2)
                    Dim schema As String = str.Split(".")(0)
                    Dim tabla As String = str.Split(".")(1)
                    Dim dto As String = traerDTO(tabla, schema)

                    Dim minusculaSingular = singular.ToLower()
                    Dim minusculaPlural = plural.ToLower()
                    Dim mayusculaSingular = singular.Substring(0, 1).ToUpper + singular.Substring(1)
                    Dim mayusculaPlural = plural.Substring(0, 1).ToUpper + plural.Substring(1)

                    Dim cols = traerColumnas(tabla, schema)

                    Dim sw As New StreamWriter(path + "\dtos\" + singular + "DTO.cs")
                    sw.Write(dto)
                    sw.Close()
                    Dim controller = traerController(singular, plural, cols(1).columna)
                    Dim sw2 As New StreamWriter(path + "\controllers\" + plural + "Controller.cs")
                    sw2.Write(controller)
                    sw2.Close()

                    If Not System.IO.Directory.Exists(path + "\Components\" + mayusculaPlural) Then
                        System.IO.Directory.CreateDirectory(path + "\Components\" + mayusculaPlural)
                    End If

                    CrearComponente("Autocompletar", path, singular, plural, cols(1).columna)
                    CrearComponente("Busqueda", path, singular, plural, cols(1).columna)
                    CrearComponente("Cantidad", path, singular, plural, cols(1).columna)
                    CrearComponente("Combo", path, singular, plural, cols(1).columna)
                    CrearComponente("EsPaginado", path, singular, plural, cols(1).columna)
                    CrearComponente("Form", path, singular, plural, cols(1).columna)
                    CrearComponente("Incluir", path, singular, plural, cols(1).columna)
                    'CrearComponente("Lista", path, singular, plural)

                    'CrearComponente("Nuevo", path, singular, plural)

                    Dim Nuevo = traerArchivo("Nuevo.txt", singular, plural, cols(1).columna)
                    Dim swNuevo As New StreamWriter(path + "\Components\" + mayusculaPlural + "\Nuevo.tsx")

                    Dim inputs = ""
                    Dim imprts = ""
                    Dim formsdata = ""
                    Dim entidadstr = ""
                    For Each item As Columna In cols
                        If item.tipo = "string" Then
                            formsdata += "    const " + item.columna + ": string = data.get('" + item.columna + "')?.toString() || ''" + vbCrLf
                        Else
                            formsdata += "    const " + item.columna + ": number = parseInt(data.get('" + item.columna + "')?.toString() || '0')" + vbCrLf
                        End If
                        entidadstr += "    ent." + item.columna + " = " + item.columna + vbCrLf
                        If item.columna <> "id" Then
                            inputs += traerInput(item)
                        End If
                        If item.foreing <> "" Then
                            imprts += "import { Combo as Combo" + item.foreing + " } from '../" + item.componente + "'" + vbCrLf
                        End If
                    Next
                    Nuevo = Nuevo.Replace("$formsdata$", formsdata)
                    Nuevo = Nuevo.Replace("$entidad$", entidadstr)
                    Nuevo = Nuevo.Replace("$columnas$", inputs)
                    Nuevo = Nuevo.Replace("$imports$", imprts)
                    swNuevo.Write(Nuevo)
                    swNuevo.Close()

                    Dim Lista = traerArchivo("Lista.txt", singular, plural, cols(1).columna)
                    Dim swLista As New StreamWriter(path + "\Components\" + mayusculaPlural + "\Lista.tsx")
                    Dim thsLista = ""
                    Dim cellsLista = ""
                    For Each item As Columna In cols
                        thsLista += "            <TableCell>" + item.columna + "</TableCell>" + vbCrLf
                        cellsLista += "            <TableCell>{" + minusculaSingular + "." + item.columna + "}</TableCell>" + vbCrLf
                    Next
                    Lista = Lista.Replace("$ths$", thsLista)
                    Lista = Lista.Replace("$cels$", cellsLista)
                    swLista.Write(Lista)
                    swLista.Close()

                    CrearComponente("Paginas", path, singular, plural, cols(1).columna)
                    CrearComponente("Seleccionado", path, singular, plural, cols(1).columna)

                    Dim Index = traerArchivo("index.txt", singular, plural, cols(1).columna)
                    Dim swIndex As New StreamWriter(path + "\Components\" + mayusculaPlural + "\index.ts")
                    swIndex.Write(Index)
                    swIndex.Close()


                    Dim useEntidad = traerArchivo("useEntidad.txt", singular, plural, cols(1).columna)
                    If Not System.IO.Directory.Exists(path + "\Hooks\") Then
                        System.IO.Directory.CreateDirectory(path + "\Hooks\")
                    End If
                    Dim swuseEntidad As New StreamWriter(path + "\Hooks\use" + mayusculaPlural + ".tsx")
                    swuseEntidad.Write(useEntidad)
                    swuseEntidad.Close()

                    Dim useEntidadStore = traerArchivo("useEntidadStore.txt", singular, plural, cols(1).columna)
                    If Not System.IO.Directory.Exists(path + "\Stores\") Then
                        System.IO.Directory.CreateDirectory(path + "\Stores\")
                    End If
                    Dim swuseEntidadStore As New StreamWriter(path + "\Stores\use" + mayusculaPlural + "Store.ts")
                    swuseEntidadStore.Write(useEntidadStore)
                    swuseEntidadStore.Close()

                    'Dim typesc = traerTypescript(tabla, schema)
                    'Dim sw3 As New StreamWriter(path + "\typescript\types.d.ts", True)
                    'sw3.Write(typesc)
                    'sw3.Close()
                    Dim entidadtypescript As String = traerEntidadTypescript(tabla, schema)
                    Dim sw4 As New StreamWriter(path + "\typescript\" + singular + ".ts")
                    sw4.Write(entidadtypescript)
                    sw4.Close()

                Next
                MsgBox("Archivos creados con exito")
            End If
        Catch ex As Exception
            MsgBox(ex.Message)
        End Try
    End Sub

    Private Function CrearComponente(componente As String, path As String, singular As String, plural As String, columnadesc As String)
        Dim mayusculaPlural = plural.Substring(0, 1).ToUpper + plural.Substring(1)
        Dim comp = traerArchivo(componente + ".txt", singular, plural, columnadesc)
        Dim swcomp As New StreamWriter(path + "\Components\" + mayusculaPlural + "\" + componente + ".tsx")
        swcomp.Write(comp)
        swcomp.Close()
    End Function

    Private Function traerArchivo(archivo As String, singular As String, plural As String, columnadesc As String) As String

        Dim minusculaSingular = singular.ToLower()
        Dim minusculaPlural = plural.ToLower()
        Dim mayusculaSingular = singular.Substring(0, 1).ToUpper + singular.Substring(1)
        Dim mayusculaPlural = plural.Substring(0, 1).ToUpper + plural.Substring(1)

        Dim str As StreamReader = New StreamReader("Archivos/" + archivo)
        Dim strArchivo As String = str.ReadToEnd()
        strArchivo = strArchivo.Replace("$entidadMayusculaPlural$", mayusculaPlural)
        strArchivo = strArchivo.Replace("$entidadMinusculaPlural$", minusculaPlural)
        strArchivo = strArchivo.Replace("$entidadMayusculaSingular$", mayusculaSingular)
        strArchivo = strArchivo.Replace("$entidadMinusculaSingular$", minusculaSingular)
        strArchivo = strArchivo.Replace("$descripcion$", columnadesc)
        Return strArchivo
    End Function

    Private Function traerEntidadTypescript(tabla As String, schema As String) As String
        Dim pa As New parametrosArray
        pa.add("tableName", tabla)
        pa.add("schemaName", schema)
        Dim ds As DataSet = Connection.Connection.Traer("usp_createTypescriptEntity", pa)
        If ds.Tables.Count > 0 Then
            Return ds.Tables(0).Rows(0)(0)
        End If
        Return Nothing
    End Function

    Private Function traerColumnas(tabla As String, schema As String) As List(Of Columna)
        Dim cols As New List(Of Columna)
        Dim pa As New parametrosArray
        pa.add("tableName", tabla)
        Dim ds As DataSet = Connection.Connection.Traer("usp_getColumns", pa)
        If ds.Tables.Count > 0 Then
            For Each row As DataRow In ds.Tables(0).Rows
                Dim col As New Columna
                col.columna = row("columna")
                col.nulable = row("nulable")
                col.foreing = row("foreing")
                col.componente = row("componente")
                col.tipo = row("tipo")
                cols.Add(col)
            Next
        End If
        Return cols
    End Function

    Private Function traerInput(col As Columna) As String
        Dim ret = ""
        If col.foreing = "" Then
            ret = "          <Grid item xs={4}>" + vbCrLf
            ret += "            <TextField fullWidth InputLabelProps={{ shrink: true }} {...bind} value={state?.$columna$} size='small' name={'$columna$'} label='$columna$' variant='outlined' />" + vbCrLf
            ret += "          </Grid>" + vbCrLf
        Else
            ret = "          <Grid item xs={4}>" + vbCrLf
            ret += "            <Combo$foreing$ name={'$columna$'} value={state?.$columna$} bind={bind} />" + vbCrLf
            ret += "          </Grid>" + vbCrLf
        End If
        ret = ret.Replace("$columna$", col.columna)
        ret = ret.Replace("$foreing$", col.foreing)

        Return ret
    End Function


    Private Function traerController(singular As String, plural As String, columnadesc As String) As Object

        columnadesc = columnadesc.Substring(0, 1).ToUpper + columnadesc.Substring(1)

        Dim str As StreamReader = New StreamReader("Archivos/controllerInfraestructura.txt")
        Dim strcontroller As String = str.ReadToEnd()

        Dim connstring As String = ConfigurationManager.ConnectionStrings("conn").ToString
        Dim builder As SqlConnectionStringBuilder = New SqlConnectionStringBuilder(connstring)
        Dim database As String = builder.InitialCatalog
        strcontroller = strcontroller.Replace("$$Db$$", database)
        strcontroller = strcontroller.Replace("$entidadsingular$", singular)
        strcontroller = strcontroller.Replace("$entidadplural$", plural)
        strcontroller = strcontroller.Replace("$descripcion$", columnadesc)
        Return strcontroller

    End Function


    Private Function traerTypescript(tabla As String, schema As String) As String
        Dim pa As New parametrosArray
        pa.add("tableName", tabla)
        pa.add("schemaName", schema)
        Dim ds As DataSet = Connection.Connection.Traer("usp_createTypescript_row", pa)
        If ds.Tables.Count > 0 Then
            Return ds.Tables(0).Rows(0)(0)
        End If
        Return Nothing
    End Function

    Private Function traerDTO(tabla As String, schema As String) As String
        Dim pa As New parametrosArray
        pa.add("tableName", tabla)
        pa.add("schemaName", schema)
        Dim ds As DataSet = Connection.Connection.Traer("usp_createDTO_row", pa)
        If ds.Tables.Count > 0 Then
            Return ds.Tables(0).Rows(0)(0)
        End If
        Return Nothing
    End Function

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        For i As Integer = 0 To chk.Items.Count - 1
            chk.SetItemChecked(i, True)
        Next
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        For i As Integer = 0 To chk.Items.Count - 1
            chk.SetItemChecked(i, False)
        Next
    End Sub
End Class
