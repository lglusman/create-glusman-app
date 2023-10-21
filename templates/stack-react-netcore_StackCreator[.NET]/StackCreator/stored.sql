USE [Infraestructura]
GO

/****** Object:  StoredProcedure [dbo].[usp_createDTO_row]    Script Date: 15/9/2023 23:48:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_createDTO_row]
	-- Add the parameters for the stored procedure here
	@tableName NVARCHAR(255), 
	@schemaName NVARCHAR(255)
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
SET NOCOUNT ON
	-- interfering with SELECT statements.

declare @str varchar(max) = '', @strResult varchar(max) = ''
declare @singular NVARCHAR(255) = (select dbo.SingularizeAllWords(@tableName))

DECLARE tableColumns CURSOR LOCAL FOR
SELECT cols.name, cols.system_type_id, cols.is_nullable FROM sys.columns cols
	JOIN sys.tables tbl ON cols.object_id = tbl.object_id
	WHERE tbl.name = @tableName
 
set @str += '||using System;'
set @str += '||using System.Collections.Generic;'
set @str += '||using WebApi.Models.DTOs;'
set @str += '||using WebApi.Models.Entities;'
set @str += '||'
set @str += '||namespace WebApi.Models.DTOs'
set @str += '||{'
set @str += '||	public class ' + @singular + 'DTO'
set @str += '||	{'
 
OPEN tableColumns
DECLARE @name NVARCHAR(MAX), @typeId INT, @isNullable BIT, @typeName NVARCHAR(MAX)
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN
	SET @typeName =
	CASE @typeId
		WHEN 35 THEN 'string' 
		WHEN 36 THEN 'Guid' 
		--WHEN 40 THEN 'DateTime'
		WHEN 40 THEN 'string'
		--WHEN 41 THEN 'DateTime'
		WHEN 41 THEN 'string'
		WHEN 48 THEN 'byte' 
		WHEN 52 THEN 'short' 
		WHEN 56 THEN 'int' 
		--WHEN 58 THEN 'DateTime'
		WHEN 58 THEN 'string'
		WHEN 60 THEN 'Decimal' 
		--WHEN 61 THEN 'DateTime' 
		WHEN 61 THEN 'string' 
		WHEN 62 THEN 'float'   
		WHEN 99 THEN 'string'  
		WHEN 104 THEN 'bool'   
		WHEN 106 THEN 'Decimal'    
		WHEN 108 THEN 'Decimal'    
		WHEN 127 THEN 'long' 
		WHEN 165 THEN 'byte[]' 
		WHEN 167 THEN 'string'   
		WHEN 175 THEN 'string'  
		WHEN 231 THEN 'string'  
		WHEN 239 THEN 'string' 
		WHEN 241 THEN 'string' 
		ELSE 'TODO(' + CAST(@typeId AS NVARCHAR) + ')'
	END;
	IF @isNullable = 1 --AND @typeId != 231 AND @typeId != 239 AND @typeId != 241 and @typeId != 40 and @typeId != 41 and @typeId != 58 and @typeId != 61
		SET @typeName = @typeName + '?'
	set @str += '||		public ' + @typeName + ' ' + @name + ' { get; set; }'	
	if @typeName like '%?'
		set @str += ' = null;'	
	else
	begin
		if @typeName = 'string'
			set @str += ' = "";'	
		else
			set @str += ' = 0;'	
	end

	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns


/* FOREING KEYS list */
DECLARE ForeignCursor CURSOR LOCAL FOR
SELECT      
    tab2.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab1.name = @tableName
	

declare @othersingular nvarchar(max)
declare @othersingularplural nvarchar(max)
declare @charindex int
DECLARE @other_table NVARCHAR(MAX)
OPEN ForeignCursor
FETCH NEXT FROM ForeignCursor INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
		set @othersingular = (select dbo.SingularizeAllWords(@other_table))


	set @str += '||		public ' + @othersingular + 'DTO? ' + @othersingular + ' { get; set; }'
	FETCH NEXT FROM ForeignCursor INTO @other_table
END
/* FOREING KEYS list */
CLOSE ForeignCursor

/* FOREING KEYS list */
DECLARE ForeignCursor2 CURSOR LOCAL FOR
SELECT      
    tab1.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab2.name = @tableName
	

OPEN ForeignCursor2
FETCH NEXT FROM ForeignCursor2 INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
	
	set @othersingular = (select dbo.SingularizeAllWords(@other_table))
	set @othersingularplural = (select dbo.SingularizeAllWordsExceptLastOne(@other_table))

	

	set @str += '||        public List<' + @othersingular + 'DTO> ' + @othersingularplural + ' { get; set; } = new List<' + @othersingular + 'DTO>();'
	FETCH NEXT FROM ForeignCursor2 INTO @other_table
END
/* FOREING KEYS list */
CLOSE ForeignCursor2

set @str += '||'
set @str += '||		public ' + @singular + ' ToEntity()'
set @str += '||		{'
set @str += '||			return new ' + @singular + '()'
set @str += '||			{'

OPEN tableColumns
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN

if (@typeId != 40 and @typeId != 41 and @typeId != 58 and @typeId != 61)
begin
	set @str += '||				' + @name + ' = ' + @name + ',' 
end
else
begin
	if (@isNullable = 0)
	begin
		set @str += '||				' + @name + ' = DateTime.Parse(' + @name + '),'
	end
	else
	begin
		set @str += '||				' + @name + ' = ' + @name + ' != "" && ' + @name + ' != null ? DateTime.Parse(' + @name + ') : null,'
	end
end

	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns

set @str += '||         };'
set @str += '||      }'

-----------
set @str += '||        internal void validar()'
set @str += '||        {'
set @str += '||            var strError = "";'

OPEN tableColumns
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN

	if (@name != 'id') 
	begin
		if (@isNullable = 0)
		begin
			if (@typeId = 35 or @typeId = 40 or @typeId = 41 or @typeId = 58 or @typeId = 61 or @typeId = 99 or @typeId = 167 or @typeId = 175 or @typeId = 231 or @typeId = 239 or @typeId = 241)
			begin
				set @str += '||            if (' + @name + '.Trim() == "") strError += "* ' + @name + ' es requerido";'
			end
			else
			begin
				set @str += '||            if (' + @name + ' == 0) strError += "* ' + @name + ' es requerido";'
			end
		end
	end

	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns
set @str += '||            if (strError != "")'
set @str += '||            {'
set @str += '||                throw new Exception(strError);'
set @str += '||            }'
set @str += '||         }'
-----------


set @str += '||   }'
set @str += '||}'


set @str += '||namespace WebApi.Models.Entities'
set @str += '||{'
set @str += '||	public partial class ' + @singular  + ': Idtoable'
set @str += '||	{'
set @str += '||'
set @str += '||		public override ' + @singular + 'DTO ToDTO()'
set @str += '||		{'
set @str += '||			var dto = new ' + @singular + 'DTO();'

OPEN tableColumns
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN
if (@typeId != 40 and @typeId != 41 and @typeId != 58 and @typeId != 61)
begin
	set @str += '||			dto.' + @name + ' = ' + @name + ';' 
end
else
begin
	if (@isNullable = 0)
	begin
		set @str += '||			dto.' + @name + ' = ' + @name + '.ToString("yyyy/MM/dd");'
	end
	else
	begin
		set @str += '||			dto.' + @name + ' = ' + @name + '?.ToString("yyyy/MM/dd");'
	end
end

	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns



OPEN ForeignCursor
FETCH NEXT FROM ForeignCursor INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
		set @othersingular = (select dbo.SingularizeAllWords(@other_table))
		set @singular = (select dbo.SingularizeAllWords(@tableName))
		set @othersingularplural = (select dbo.SingularizeAllWordsExceptLastOne(@tableName))


	set @str += '||			if (' + @othersingular + ' != null)'
	set @str += '||			{'
	set @str += '||				this.' + @othersingular + '.' + @othersingularplural + ' = new List<' + @singular + '>();'
	set @str += '||				dto.' + @othersingular + ' = ' + @othersingular + '.ToDTO();'
	set @str += '||			}'
	FETCH NEXT FROM ForeignCursor INTO @other_table
END
CLOSE ForeignCursor


OPEN ForeignCursor2
FETCH NEXT FROM ForeignCursor2 INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
		set @othersingular = (select dbo.SingularizeAllWords(@other_table))
	set @othersingularplural = (select dbo.SingularizeAllWordsExceptLastOne(@other_table))


	set @str += '||			if (' + @othersingularplural + ' != null)'
	set @str += '||			{'
	set @str += '||				var lista = new List<' + @othersingular + 'DTO>();'
	set @str += '||				foreach (var item in ' + @othersingularplural + ')'
	set @str += '||				{'
	set @str += '||					item.' + @singular + ' = new ' + @singular + '();'
	set @str += '||					lista.Add(item.ToDTO());'
	set @str += '||				}'
	set @str += '||				dto.' + @othersingularplural + ' = lista;'
	set @str += '||			}'
	FETCH NEXT FROM ForeignCursor2 INTO @other_table
END
CLOSE ForeignCursor2

set @str += '||			return dto;'
set @str += '||		}'
set @str += '||	}'
set @str += '||}'

SET @strResult = REPLACE(@str, '||', CHAR(13));

select @strResult

END
GO

/****** Object:  StoredProcedure [dbo].[usp_createTypescript_row]    Script Date: 15/9/2023 23:48:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_createTypescript_row]
	-- Add the parameters for the stored procedure here
	@tableName NVARCHAR(255), 
	@schemaName NVARCHAR(255)
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
SET NOCOUNT ON
	-- interfering with SELECT statements.

declare @str varchar(max) = '', @strResult varchar(max) = ''
declare @singular NVARCHAR(255) = (select dbo.SingularizeAllWords(@tableName))

DECLARE tableColumns CURSOR LOCAL FOR
SELECT dbo.lowerFirstLetter(cols.name) name, cols.system_type_id, cols.is_nullable FROM sys.columns cols
	JOIN sys.tables tbl ON cols.object_id = tbl.object_id
	WHERE tbl.name = @tableName
 
set @str += '//export interface ' + @singular + ' {'
 
OPEN tableColumns
DECLARE @name NVARCHAR(MAX), @typeId INT, @isNullable BIT, @typeName NVARCHAR(MAX)
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN
	SET @typeName =
	CASE @typeId
		WHEN 35 THEN 'string' 
		WHEN 36 THEN 'Guid' 
		--WHEN 40 THEN 'DateTime'
		WHEN 40 THEN 'string'
		--WHEN 41 THEN 'DateTime'
		WHEN 41 THEN 'Date'
		WHEN 48 THEN 'byte' 
		WHEN 52 THEN 'number' 
		WHEN 56 THEN 'number' 
		--WHEN 58 THEN 'DateTime'
		WHEN 58 THEN 'Date'
		WHEN 60 THEN 'number' 
		--WHEN 61 THEN 'DateTime' 
		WHEN 61 THEN 'Date' 
		WHEN 62 THEN 'float'   
		WHEN 99 THEN 'string'  
		WHEN 104 THEN 'boolean'   
		WHEN 106 THEN 'number'    
		WHEN 108 THEN 'number'    
		WHEN 127 THEN 'number' 
		WHEN 165 THEN 'byte[]' 
		WHEN 167 THEN 'string'   
		WHEN 175 THEN 'string'  
		WHEN 231 THEN 'string'  
		WHEN 239 THEN 'string' 
		WHEN 241 THEN 'string' 
		ELSE 'TODO(' + CAST(@typeId AS NVARCHAR) + ')'
	END;
	IF @isNullable = 1 AND @typeId != 231 AND @typeId != 239 AND @typeId != 241 and @typeId != 40 and @typeId != 41 and @typeId != 58 and @typeId != 61
		SET @name = @name + '?'
	set @str += '//  ' + @name+ ': ' + @typeName 
	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns


/* FOREING KEYS list */
DECLARE ForeignCursor CURSOR LOCAL FOR
SELECT      
    tab2.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab1.name = @tableName
	

declare @othersingular nvarchar(max)
declare @othersingularplural nvarchar(max)
declare @charindex int
DECLARE @other_table NVARCHAR(MAX)
OPEN ForeignCursor
FETCH NEXT FROM ForeignCursor INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
		set @othersingular = (select dbo.SingularizeAllWords(@other_table))

	set @str += '//  ' + dbo.lowerFirstLetter(@othersingular) + ': ' + @othersingular 

	--set @str += '//		public ' + @othersingular + 'DTO ' + @othersingular + ' { get; set; }'
	FETCH NEXT FROM ForeignCursor INTO @other_table
END
/* FOREING KEYS list */
CLOSE ForeignCursor

/* FOREING KEYS list */
DECLARE ForeignCursor2 CURSOR LOCAL FOR
SELECT      
    tab1.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab2.name = @tableName
	

OPEN ForeignCursor2
FETCH NEXT FROM ForeignCursor2 INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
	
	set @othersingular = (select dbo.SingularizeAllWords(@other_table))
	set @othersingularplural = (select dbo.SingularizeAllWordsExceptLastOne(@other_table))

	
	set @str += '//  ' + dbo.lowerFirstLetter(@othersingularplural) + ': ' + @othersingular + '[]'

	--set @str += '//        public List<' + @othersingular + 'DTO> ' + @othersingularplural + ' { get; set; }'
	FETCH NEXT FROM ForeignCursor2 INTO @other_table
END
/* FOREING KEYS list */
CLOSE ForeignCursor2


set @str += '//}'

SET @strResult = REPLACE(@str, '//', CHAR(13));

select @strResult

END
GO

/****** Object:  StoredProcedure [dbo].[usp_createTypescriptEntity]    Script Date: 15/9/2023 23:48:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_createTypescriptEntity]
	-- Add the parameters for the stored procedure here
	@tableName NVARCHAR(255), 
	@schemaName NVARCHAR(255)
	

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
SET NOCOUNT ON
	-- interfering with SELECT statements.

declare @str varchar(max) = '', @strResult varchar(max) = ''
declare @imports varchar(max) = 'import { doDelete, doGet, doPost, doPut } from ''..'''
set @imports += '//import { Paginacion } from ''../../Types/paginacion'''
set @imports += '//import { typeOpciones } from ''../../Types/types'''
declare @constructor varchar(max) = '//   constructor() {'
declare @singular NVARCHAR(255) = (select dbo.SingularizeAllWords(@tableName))


DECLARE tableColumns CURSOR LOCAL FOR
SELECT cols.name, cols.system_type_id, cols.is_nullable FROM sys.columns cols
	JOIN sys.tables tbl ON cols.object_id = tbl.object_id
	WHERE tbl.name = @tableName
 
set @str += '//export class ' + @singular
set @str += ' {'
 
OPEN tableColumns
DECLARE @name NVARCHAR(MAX), @typeId INT, @isNullable BIT, @typeName NVARCHAR(MAX)
FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
WHILE @@FETCH_STATUS = 0
BEGIN
	SET @typeName =
	CASE @typeId
		WHEN 35 THEN 'string' 
		WHEN 36 THEN 'Guid' 
		--WHEN 40 THEN 'DateTime'
		WHEN 40 THEN 'string'
		--WHEN 41 THEN 'DateTime'
		WHEN 41 THEN 'string'
		WHEN 48 THEN 'byte' 
		WHEN 52 THEN 'number' 
		WHEN 56 THEN 'number' 
		--WHEN 58 THEN 'DateTime'
		WHEN 58 THEN 'string'
		WHEN 60 THEN 'number' 
		--WHEN 61 THEN 'DateTime' 
		WHEN 61 THEN 'string' 
		WHEN 62 THEN 'number'   
		WHEN 99 THEN 'string'  
		WHEN 104 THEN 'boolean'   
		WHEN 106 THEN 'number'    
		WHEN 108 THEN 'number'    
		WHEN 127 THEN 'number' 
		WHEN 165 THEN 'byte[]' 
		WHEN 167 THEN 'string'   
		WHEN 175 THEN 'string'  
		WHEN 231 THEN 'string'  
		WHEN 239 THEN 'string' 
		WHEN 241 THEN 'string' 
		ELSE 'TODO(' + CAST(@typeId AS NVARCHAR) + ')'
	END;
	set @name = dbo.lowerFirstLetter(@name)

	IF @isNullable = 1 --AND @typeId != 231 AND @typeId != 239 AND @typeId != 241 and @typeId != 40 and @typeId != 41 and @typeId != 58 and @typeId != 61
		set @str += '//  ' +  @name + '? : ' + @typeName 
	else
		set @str += '//  ' +  @name + ': ' + @typeName 

	if @name like '%?'
		set @constructor += '//    this.' + @name + ' = undefined;'	
	else
	begin
		if @typeName = 'string'
			set @constructor += '//    this.' + @name + ' = "";'	
		else
			set @constructor += '//    this.' + @name + ' = 0;'	
	end

	FETCH NEXT FROM tableColumns INTO @name, @typeId, @isNullable
END
  
CLOSE tableColumns


/* FOREING KEYS list */
DECLARE ForeignCursor CURSOR LOCAL FOR
SELECT      
    tab2.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab1.name = @tableName
	

declare @othersingular nvarchar(max)
declare @othersingularplural nvarchar(max)
declare @charindex int
DECLARE @other_table NVARCHAR(MAX)
OPEN ForeignCursor
FETCH NEXT FROM ForeignCursor INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
		set @othersingular = (select dbo.SingularizeAllWords(@other_table))
		declare @othersingularlower varchar(100) = (select dbo.lowerFirstLetter(@othersingular))



	set @str += '//  ' + @othersingularlower + ': ' + @othersingular 
	set @constructor += '//    this.' + @othersingularlower + ' = new ' + @othersingular + '();'	
	set @imports += '//import { ' + @othersingular +'} from ''./' + @othersingular + ''''
	
	FETCH NEXT FROM ForeignCursor INTO @other_table
END
	

/* FOREING KEYS list */
CLOSE ForeignCursor

/* FOREING KEYS list */
DECLARE ForeignCursor2 CURSOR LOCAL FOR
SELECT      
    tab1.name AS other_table
FROM sys.foreign_key_columns fkc
INNER JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
INNER JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
INNER JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
INNER JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
INNER JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab2.name = @tableName
	

OPEN ForeignCursor2
FETCH NEXT FROM ForeignCursor2 INTO @other_table
WHILE @@FETCH_STATUS = 0
BEGIN
	
	set @othersingular = (select dbo.SingularizeAllWords(@other_table))
	set @othersingularplural = (select dbo.SingularizeAllWordsExceptLastOne(@other_table))

	set @othersingularplural = (select dbo.lowerFirstLetter(@othersingularplural))

	set @str += '//  ' + @othersingularplural + ': ' + @othersingular + '[]' 
	set @constructor += '//    this.' + @othersingularplural + ' = new Array<' + @othersingular + '>();'	
	set @imports += '//import { ' + @othersingular +'} from ''./' + @othersingular + ''''

	FETCH NEXT FROM ForeignCursor2 INTO @other_table
END
/* FOREING KEYS list */
CLOSE ForeignCursor2
declare @functions varchar(max) = ''
set @functions +='//  static async TraerUno(id: number, { inc = '''', cant = 0, pag = 0, orden = '''' }: typeOpciones): Promise<Paginacion<' + @singular + '> | null> {'
set @functions +='//    return await doGet(`/' + @tableName + '/${id}?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)'
set @functions +='//  }'
set @functions +='//  static async TraerTodos({ inc = '''', cant = 0, pag = 0, orden = '''' }: typeOpciones): Promise<Paginacion<' + @singular + '> | null> {'
set @functions +='//    return await doGet(`/' + @tableName + '?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)'
set @functions +='//  }'
set @functions +='//  static async Buscar(busqueda: string, { inc = '''', cant = 0, pag = 0, orden = '''' }: typeOpciones): Promise<Paginacion<' + @singular + '> | null> {'
set @functions +='//    if (busqueda === undefined || busqueda === null || busqueda === '''') {'
set @functions +='//      return null'
set @functions +='//    }'
set @functions +='//    const ret = await doGet(`/' + @tableName + '/${busqueda}__ax?inc=${inc}&cant=${cant}&pag=${pag}&orden=${orden}`)'
set @functions +='//     return ret'
set @functions +='//   }'
set @functions +='//   async Guardar() {'
set @functions +='//      let resp: Paginacion<' + @singular + '>'
set @functions +='//      if (this.id > 0) {'
set @functions +='//         resp = await doPut(`/' + @tableName + '`, this)'
set @functions +='//      } else {'
set @functions +='//         resp = await doPost(`/' + @tableName + '`, this)'
set @functions +='//      }'
set @functions +='//      return resp'
set @functions +='//   }'
set @functions +='//   static async Eliminar(id: number) {'
set @functions +='//      return await doDelete(`/' + @tableName + '`, id)'
set @functions +='//   }'


set @str +=  @constructor + '//  }'

set @str = @imports + @str + @functions 

set @str += '//}'

SET @strResult = REPLACE(@str, '//', CHAR(13));

select @strResult

END
GO

/****** Object:  StoredProcedure [dbo].[usp_getColumns]    Script Date: 15/9/2023 23:48:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_getColumns]
	-- Add the parameters for the stored procedure here
	@tableName NVARCHAR(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

  ;with cte as (
SELECT      
  col1.name,  tab2.name AS other_table
FROM sys.foreign_key_columns fkc
left JOIN sys.objects obj
    ON obj.object_id = fkc.constraint_object_id
left JOIN sys.tables tab1
    ON tab1.object_id = fkc.parent_object_id
left JOIN sys.columns col1
    ON col1.column_id = parent_column_id AND col1.object_id = tab1.object_id
left JOIN sys.tables tab2
    ON tab2.object_id = fkc.referenced_object_id
left JOIN sys.columns col2
    ON col2.column_id = referenced_column_id AND col2.object_id = tab2.object_id
where tab1.name = @tableName
),
cte2 as (
		select 35 type2 , 'string' nombre union 
		select 36 , 'Guid' union
		select 40 , 'string' union
		select 41 , 'string' union
		select 48 , 'byte'  union
		select 52 , 'number' union
		select 56 , 'number' union
		select 58 , 'string' union
		select 60 , 'number' union
		select 61 , 'string' union
		select 62 , 'number' union
		select 99 , 'string' union
		select 104 , 'boolean' union
		select 106 , 'number' union
		select 108 , 'number' union 
		select 127 , 'number' union
		select 165 , 'byte[]' union
		select 167 , 'string' union
		select 175 , 'string' union
		select 231 , 'string' union
		select 239 , 'string' union
		select 241 , 'string' 
		)
SELECT dbo.lowerFirstLetter(cols.name) columna, cols.is_nullable nulable, dbo.SingularizeAllWords(cte.other_table) foreing , isnull(cte.other_table,'') componente,
isnull(cte2.nombre,'') tipo
FROM sys.columns cols
inner join sys.tables tbl ON cols.object_id = tbl.object_id
left join cte on cols.name = cte.name
left join cte2 on cols.system_type_id = cte2.type2
WHERE tbl.name = @tableName
and cols.name not in 
(
'FechaAlta',
'FechaBaja',
'FechaModificacion',
'UsuarioAltaId',
'UsuarioBajaId',
'UsuarioModificacionId'
)

END
GO

/****** Object:  StoredProcedure [dbo].[usp_getTables]    Script Date: 15/9/2023 23:48:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_getTables]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select  schema_name(t.schema_id) + '.' + t.name  as tabla,
t.name  as tablaplural, dbo.SingularizeAllWords(t.name) as tablasingular
from sys.tables t
where t.name <> 'sysdiagrams'
order by SCHEMA_ID, name
END
GO


