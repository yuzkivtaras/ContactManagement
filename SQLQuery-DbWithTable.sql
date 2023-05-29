CREATE PROCEDURE ContactsManager
AS
BEGIN
    IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ContactsManager')
    BEGIN
        CREATE DATABASE ContactsManager;
    END

    IF NOT EXISTS (SELECT * FROM ContactsManager.sys.tables WHERE name = 'Contacts')
    BEGIN
        CREATE TABLE ContactsManager.dbo.Contacts
        (
            [Id]          INT             IDENTITY (1, 1) NOT NULL,
            [Name]        NVARCHAR (MAX)  NOT NULL,
            [DateOfBirth] DATETIME2 (7)   NOT NULL,
            [Married]     BIT             NOT NULL,
            [Phone]       NVARCHAR (MAX)  NOT NULL,
            [Salary]      DECIMAL (18, 2) NOT NULL,
            CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED ([Id] ASC)
        );
    END
END

