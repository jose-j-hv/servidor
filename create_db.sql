DROP DATABASE MS;
CREATE DATABASE MS;
USE MS;
CREATE OR REPLACE TABLE ubicacion(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    calle VARCHAR(250) NOT NULL,
    CP INT NOT NULL,
    colonia VARCHAR(350) NOT NULL,
    referencias VARCHAR(550) NOT NULL
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE tema(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    descripcion VARCHAR(550) NOT NULL,
    prioridad INT NOT NULL
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE area(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    descripcion VARCHAR(550) NOT NULL
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE rol(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(250) NOT NULL,
    descripcion VARCHAR(350) NOT NULL
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE permisos(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    permiso VARCHAR(150) NOT NULL,
    descripcion VARCHAR(350) NOT NULL
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE permisos_rol(
    id_rol BIGINT UNSIGNED NOT NULL,
    id_permiso BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    CONSTRAINT `fk_id_r_rol_per`
        FOREIGN KEY (id_rol) REFERENCES rol(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_p_rol_per`
        FOREIGN KEY (id_permiso) REFERENCES permisos(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE usuario(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    correo VARCHAR(250) NOT NULL,
    id_rol BIGINT UNSIGNED,
    pass VARCHAR(1000) NOT NULL,
    creado_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_creado_usuario BIGINT UNSIGNED,
    CONSTRAINT `fk_id_rol_usuario`
        FOREIGN KEY (id_rol) REFERENCES rol(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_usuario_usuario`
        FOREIGN KEY (id_creado_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE telefono(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    telefono INT NOT NULL,
    id_usuario BIGINT UNSIGNED,
    extencion INT NULL,
    CONSTRAINT `fk_id_usuario_telefono`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE resp_area(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_responsable BIGINT UNSIGNED,
    id_area BIGINT UNSIGNED,
    CONSTRAINT `fk_id_usuario_area`
        FOREIGN KEY (id_responsable) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_area_a`
        FOREIGN KEY (id_area) REFERENCES area(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE ticket(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(250) NOT NULL,
    descripcion VARCHAR(2500) NOT NULL,
    id_tema BIGINT UNSIGNED,
    id_contacto BIGINT UNSIGNED,
    id_ubicacion BIGINT UNSIGNED,
    creado_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_id_tema_ticket`
        FOREIGN KEY (id_tema) REFERENCES tema(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_contacto_ticket`
        FOREIGN KEY (id_contacto) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
        CONSTRAINT `fk_id_ubicacion_ticket`
        FOREIGN KEY (id_ubicacion) REFERENCES ubicacion(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE estatus(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ticket BIGINT UNSIGNED,
    estatus VARCHAR(100) NOT NULL,
    id_usuario BIGINT UNSIGNED,
    cambio_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_id_ticket_estatus`
        FOREIGN KEY (id_ticket) REFERENCES ticket(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_usuario_estatus`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE mensaje(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ticket BIGINT UNSIGNED,
    id_usuario BIGINT UNSIGNED,
    mensaje VARCHAR(2500) NOT NULL,
    fecha DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_id_ticket_m`
        FOREIGN KEY (id_ticket) REFERENCES ticket(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_usuario_m`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE tarea(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mes DATE NOT NULL,
    fecha_inicio TIMESTAMP NOT NULL,
    tiempo_invertido TIMESTAMP,
    tiempo_final TIMESTAMP,
    tiempo_maximo DATE,
    id_usuario BIGINT UNSIGNED,
    id_area_ti BIGINT UNSIGNED,
    id_tema BIGINT UNSIGNED,
    id_ubicacion BIGINT UNSIGNED,
    id_ticket BIGINT UNSIGNED,
    CONSTRAINT `fk_id_usuario_t`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_area_t`
        FOREIGN KEY (id_area_ti) REFERENCES area(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_tema_t`
        FOREIGN KEY (id_tema) REFERENCES tema(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_ubicacion_t`
        FOREIGN KEY (id_ubicacion) REFERENCES ubicacion(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_ticket_t`
        FOREIGN KEY (id_ticket) REFERENCES ticket(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE evidencias(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ticket BIGINT UNSIGNED,
    id_usuario BIGINT UNSIGNED,
    evidenia longblob NOT NULL,
    CONSTRAINT `fk_id_ticket_e`
        FOREIGN KEY (id_ticket) REFERENCES ticket(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_usuario`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE kpi(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(300) NOT NULL,
    id_area_ti BIGINT UNSIGNED,
    descripcion VARCHAR(350) NOT NULL,
    CONSTRAINT `fk_id_area_k`
        FOREIGN KEY (id_area_ti) REFERENCES area(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;
CREATE OR REPLACE TABLE kpi_hstorico(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_kpi BIGINT UNSIGNED,
    id_usuario BIGINT UNSIGNED,
    mes DATE NOT NULL,
    cumplimiemto BOOLEAN,
    num_tickets int,
    CONSTRAINT `fk_id_kpi_h_k`
        FOREIGN KEY (id_kpi) REFERENCES kpi(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    CONSTRAINT `fk_id_kpi_h_u`
        FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)ENGINE = InnoDB;

INSERT INTO rol (rol, descripcion) VALUES 
('Administrador', 'Tiene acceso completo a todas las funcionalidades del sistema'),
('Editor', 'Puede crear y modificar contenido, pero no puede gestionar usuarios ni cambiar configuraciones del sistema'),
('Usuario', 'Puede ver y utilizar el contenido, pero no puede modificarlo'),
('Invitado', 'Acceso limitado a solo ciertas partes del contenido');
INSERT INTO permisos (permiso, descripcion) VALUES 
('Ver Contenido', 'Permite al usuario ver el contenido del sistema'),
('Crear Contenido', 'Permite al usuario crear nuevo contenido'),
('Editar Contenido', 'Permite al usuario editar contenido existente'),
('Eliminar Contenido', 'Permite al usuario eliminar contenido existente'),
('Gestionar Usuarios', 'Permite al usuario crear, modificar y eliminar otros usuarios'),
('Configuración del Sistema', 'Permite al usuario cambiar configuraciones del sistema');
INSERT INTO permisos_rol (id_rol, id_permiso) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6);
INSERT INTO permisos_rol (id_rol, id_permiso) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4);
INSERT INTO permisos_rol (id_rol, id_permiso) VALUES 
(3, 1);
INSERT INTO permisos_rol (id_rol, id_permiso) VALUES 
(4, 1);
INSERT INTO ubicacion (nombre, calle, CP, colonia, referencias) VALUES
 ('Oficina central', 'uno', 12435, 'dos', 'na'), 
 ('Zazatlán', 'uno', 12435, 'dos', 'na'),
 ('Cuacuila', 'uno', 12435, 'dos', 'na'),
 ('Chamontoya', 'uno', 12435, 'dos', 'na');
INSERT INTO tema (nombre, descripcion, prioridad) VALUES 
('Apoyo de Software', 'Solución para la gestión de aplicaciones internas.', 2),
('Accesorio de computo', 'Reparación, mantenimiento o reemplazo de componentes de equipos de cómputo.', 2),
('Apoyo GSUITE (gmail, drive, etc)', 'Asesoramiento sobre el uso de aplicaciones de Google.', 3),
('Cámaras y videovigilancia', 'Instalación y mantenimiento de equipos y software para el funcionamiento adecuado del sistema de videovigilancia.', 3),
('Falla de equipo', 'Avería que impide el uso correcto del equipo de cómputo.', 4),
('Impresoras', 'Problemas de impresión.', 2),
('Internet/Red/Navegación', 'Problemas de navegación en la red.', 3),
('Mantenimiento de equipo', 'Reparación de fallas en el equipo de cómputo.', 2),
('Requerimiento Odoo / Mejora', 'Incorporación de módulos adicionales para satisfacer necesidades específicas.', 1),
('Requerimiento Odoo / Problema', 'Reparación o modificación de módulos existentes.', 2),
('Sala de cómputo', 'Administración y mantenimiento de la sala de cómputo.', 3),
('Tabletas', 'Reparación o mantenimiento de tabletas.', 3),
('Apoyos alimentarios', 'Distribución de apoyos alimentarios.', 2),
('CCTV', 'Mantenimiento y operación del sistema de cámaras de seguridad (CCTV).', 5);
CREATE OR REPLACE TABLE sesionUsuario (
  ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  PROPID VARCHAR(128) NOT NULL,
  APPNAME VARCHAR(64) NOT NULL,
  LISTENERCNT INTEGER NOT NULL,
  LASTACCESS DATETIME NOT NULL,
  CREATIONTIME DATETIME NOT NULL,
  MAXINACTIVETIME INTEGER NOT NULL,
  USERNAME BIGINT UNSIGNED,
  SMALL INTEGER NOT NULL,
  MEDIUM INTEGER NOT NULL,
  LARGE INTEGER NOT NULL,
  CONSTRAINT fk_id_USER_email_usuario
    FOREIGN KEY (USERNAME) REFERENCES usuario(id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  PRIMARY KEY (ID)
) ENGINE=InnoDB;
