USE [Infraestructura]
GO

/****** Object:  UserDefinedFunction [dbo].[lowerFirstLetter]    Script Date: 14/9/2023 19:47:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[lowerFirstLetter] 
(
	-- Add the parameters for the function here
	@word varchar(max)
) 
RETURNS varchar(max)
AS
BEGIN
	-- Declare the return variable here
	

	-- Add the T-SQL statements to compute the return value here
	return LOWER(LEFT(@word,1))+(SUBSTRING(@word,2,LEN(@word)))

END
GO

/****** Object:  UserDefinedFunction [dbo].[Singularize]    Script Date: 14/9/2023 19:47:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[Singularize]
(
	@FieldName varchar(max)
)
RETURNS varchar(max)
AS
BEGIN
	DECLARE @Output varchar(max)

	IF @FieldName NOT LIKE '%s'
	-- already singular
	BEGIN
		SET @Output = @FieldName
	END

	ELSE IF @FieldName LIKE '%ss'
	-- already singular ie. mass, chess
	BEGIN
		SET @Output = @FieldName
	END

	ELSE IF @FieldName LIKE '%ies' 
	-- ie. cherries, ladies
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName)-3) + 'y'
	END

	ELSE IF @FieldName LIKE '%oes' 
	-- ie. heroes, potatoes
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName) -2)
	END

	ELSE IF @FieldName LIKE '%es' and SUBSTRING(@FieldName, LEN(@FieldName)-2, 1) in ('a', 'e', 'i', 'o', 'u')
	-- ie. massages, phases
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName) -1)
	END

	ELSE IF @FieldName LIKE '%es' and SUBSTRING(@FieldName, LEN(@FieldName) -2, 1) in ('h')
	-- ie. witches, dishes
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName) - 2)
	END

	ELSE IF @FieldName LIKE '%es' and SUBSTRING(@FieldName, LEN(@FieldName) -2, 1) in ('b','c','d','f','g','j','k','l',	'm','n','p','q','r','s','t','v','w','x','y','z')
	-- ie. kisses, judges
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName) - 2)
	END

	ELSE IF @FieldName LIKE '%s'
	-- ie. laps, clocks, boys
	BEGIN
		SET @Output = SUBSTRING(@FieldName, 1, LEN(@FieldName) -1)
	END

	RETURN @Output
END
GO

/****** Object:  UserDefinedFunction [dbo].[SingularizeAllWords]    Script Date: 14/9/2023 19:47:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[SingularizeAllWords]
(
	-- Add the parameters for the function here
	@string varchar(255)
)
RETURNS varchar(255)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Names VARCHAR(8000) 
SELECT @Names = COALESCE(@Names + '', '') + value 
FROM (
select dbo.singularize(value) as value from dbo.splitCamelcase(@string)
) a

	-- Return the result of the function
	RETURN @Names

END
GO

/****** Object:  UserDefinedFunction [dbo].[SingularizeAllWordsExceptLastOne]    Script Date: 14/9/2023 19:47:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
create FUNCTION [dbo].[SingularizeAllWordsExceptLastOne]
(
	-- Add the parameters for the function here
	@string varchar(255)
)
RETURNS varchar(255)
AS
BEGIN
declare @maxpos int = 0

select @maxpos = max(pos) from dbo.splitCamelcase(@string)
	-- Declare the return variable here
	DECLARE @Names VARCHAR(8000) 
SELECT @Names = COALESCE(@Names + '', '') + value 
FROM (
select 
	case when pos < @maxpos
	then dbo.singularize(value)
	else value end
	as value 	
	from dbo.splitCamelcase(@string)
) a

	-- Return the result of the function
	RETURN @Names

END
GO


