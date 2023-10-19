Imports System.Configuration
Imports System.Data.SqlClient
Imports System.Data

Public Class Connection

    Private Shared connStr As String = ConfigurationManager.ConnectionStrings("conn").ToString

    Public Shared Function Traer(ByVal storedProcedure As String, ByVal parameters As parametrosArray) As DataSet
        'Dim cnn1 = ConfigurationManager.ConnectionStrings
        'Dim cnn As String = ConfigurationManager.ConnectionStrings("siges").ConnectionString
        Dim Conection As New SqlConnection(connStr)

        Dim conexion As SqlConnection = Conection
        Dim Comando As New SqlCommand
        Dim stored As String = storedProcedure
        Dim pa As parametrosArray = parameters
        With Comando
            .CommandType = CommandType.StoredProcedure
            .Connection = conexion
            .CommandText = stored
            For Each p As SqlParameter In pa.Parametros
                .Parameters.Add(p)
            Next
        End With
        Dim ds As New DataSet
        Try
            Dim da As New SqlDataAdapter()
            da.SelectCommand = Comando
            da.Fill(ds)
            Return ds
        Catch ex As Exception
            Throw New Exception(ex.Message.ToString)
        Finally
            pa.limpiar()
            ds.Dispose()
            If conexion.State = ConnectionState.Open Then
                conexion.Close()
            End If
        End Try
    End Function


End Class
