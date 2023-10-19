Imports System.Collections.Generic
Imports System.Data.SqlClient
Imports System.Data

Public Class parametrosArray

    Private _Parametros As New List(Of SqlParameter)
    Public Property Parametros() As List(Of SqlParameter)
        Get
            Return _Parametros
        End Get
        Set(ByVal value As List(Of SqlParameter))
            _Parametros = value
        End Set
    End Property

    Public Sub limpiar()
        _Parametros.Clear()
    End Sub

    Public Sub add(ByVal name As String, ByVal valor As Object)
        Dim pa As New SqlParameter()
        If CType(valor, String) = "borrar" Then
            pa = New SqlParameter(name, SqlDbType.NVarChar)
            pa.Value = "Null"
        Else
            If CType(valor, String) = "borrarFecha" Then
                pa = New SqlParameter(name, SqlDbType.DateTime)
                pa.Value = DBNull.Value
            Else
                If CType(valor, String) = "borrarEntero" Then
                    pa = New SqlParameter(name, SqlDbType.Int)
                    pa.Value = DBNull.Value
                Else
                    pa = New SqlParameter(name, valor)
                End If
            End If
        End If
        Parametros.Add(pa)
    End Sub

End Class
