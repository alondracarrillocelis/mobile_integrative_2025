-- crear base de datos microtest
CREATE DATABASE microtest;

USE microtest;

-- crear tabla personal que contenga los campos: idCodigo, Nombre, Rol, Titulo, Correo, Celular, Direccion, Notificar por correo y contraseña
CREATE TABLE
    personal (
        idCodigo INT PRIMARY KEY AUTO_INCREMENT,
        Nombre VARCHAR(50),
        Rol VARCHAR(50),
        Titulo VARCHAR(50),
        Correo VARCHAR(50),
        Celular VARCHAR(10),
        Direccion VARCHAR(50),
        NotificarPorCorreo BOOLEAN,
        Contrasena VARCHAR(50),
        estado BOOLEAN DEFAULT TRUE
    );

-- dos ejemplos de insertar datos en la tabla personal
INSERT INTO
    personal (Nombre, Rol, Titulo, Correo, Celular, Direccion, NotificarPorCorreo, Contrasena)
VALUES
    ('Juan', 'Administrador', 'Ingeniero', 'test', '1234567890', 'Calle 123', TRUE, '1234'),
    ('Pedro', 'Operario', 'Tecnico', 'test2', '1234567890', 'Calle 123', TRUE, '1234');
    


-- crear tabla clientes que contenga los campos idCodigo, Empresa(nombre de la empresa), ciudad, contacto(solo un nombre), correo, telefono y portal
CREATE TABLE
    clientes (
        idCodigo INT PRIMARY KEY AUTO_INCREMENT,
        empresa VARCHAR(50),
        ciudad VARCHAR(50),
        contacto VARCHAR(50),
        correo VARCHAR(50),
        telefono VARCHAR(10),
        portal VARCHAR(50)
    );

-- dos ejemplos de insertar datos en la tabla clientes
INSERT INTO
    clientes (empresa, ciudad, contacto, correo, telefono, portal)
VALUES
    ('Empresa1', 'Bogota', 'Juan', 'juannn@gmail.com', '1234567890', 'www.empresa1.com'),
    ('Empresa2', 'Medellin', 'Pedro', 'pedritoVM@gmail,com', '1234567890', 'www.empresa2.com');


-- crear tabla categoria que contenga el campo NombreCategoria que sea unico y primary key
CREATE TABLE
    categoria (
        NombreCategoria VARCHAR(50) PRIMARY KEY
    );

-- dos ejemplos de insertar datos en la tabla categoria
INSERT INTO
    categoria (NombreCategoria)
VALUES
    ('Categoria1'),
    ('Categoria2');
    

--crear tabla proveedores que contenga los campos idCodigo, Empresa, Contacto y telefono