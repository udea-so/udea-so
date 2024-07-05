---
sidebar_position: 1
label: "linux"
Description: "Tutorial sobre linux"
---

# Linux básico #

:::tip[Objetivos]
* Comprender los conceptos básicos sobre el manejo de la consola (o terminal) en GNU/Linux, necesarios para la realización de las tareas básicas de programación.
:::


## 1. Introducción al manejo de la consola GNU/Linux 

### 1.1 Requisitos

Antes de empezar tenga en cuenta que para poder seguir esta documentación de manera apropiada se necesita disponer de un equipo con Linux instalado (ya sea virtual, nativo o live cd).

:::info
En internet se encuentran innumerables recursos pero se resaltan los siguientes 2 recursos:
* [The Unix and GNU/Linux command line](https://bootlin.com/doc/legacy/command-line/unix_linux_introduction.pdf)
* [GNU/Linux command memento](https://bootlin.com/doc/legacy/command-line/command_memento.pdf)
:::

La consola o terminal (shell) es un programa informático donde el usuario interactúa con el sistema operativo mediante una ventana que espera órdenes escritas desde el teclado.
La consola permite controlar completamente un equipo con un sistema operativo GNU/Linux, es una interfaz muy poderosa pero a la vez muy liviana (mucho más simple que la interfaz gráfica).
En GNU/Linux la consola es esencial, puesto que permite realizar un gran número de acciones para la gestión del sistema operativo, por ejemplo, dar o quitar permisos, configurar e instalar drivers, enviar señales (posiblemente de terminación) a procesos y muchas otras acciones de gestión y control.

Cualquier usuario puede usar la consola, debido a que es un programa más del sistema operativo. Es de notar que se debe tener cuidado con la ejecución de comandos, ya que si ejecutamos algún comando sin conocimiento y este resulta peligroso para nuestro sistema, podríamos dejar el equipo inutilizable, borrar archivos necesarios, etc.

Existen un gran número de comandos disponibles, y es casi imposible saberlos todos de memoria, pero si es recomendable conocer bien los más usados. A la hora de hacer configuraciones, instalaciones, modificaciones en el sistema operativo es necesario tomar precauciones, como generar respaldo de información o consultar el correcto uso del comando a utilizar.
Al ejecutar los comandos en la consola, éstos se ejecutan usando como directorio de trabajo la carpeta actual (`/home/<user>` por defecto), por tanto, si se quiere realizar una acción sobre otra carpeta basta con poner la ruta después del comando.

## 2. Organización del sistema de archivos 

En linux todo es un archivo (directorios, archivos como tal y dispositivos). En linux el sistema de archivos se organiza en una estructura jerárquica a modo de arbol, siendo el nivel más alto del sistema el directorio raíz (`/`) tal y como se muestra en la siguiente figura.

<p align = 'center'>
<figure>
![Sistema de archivos linux](/img/labs/tutoriales/linux/rutas.jpg)
<figcaption>**Fig 1**. Esquema resumido de la jerarquía del sistema de archivos en GNU/Linux. (Imagen tomada de: [Understanding the Linux File System](http://bit.ly/2BDqTQZ))</figcaption>
</figure>
</p>

### 2.1. Rutas 
Secuencia de directorios anidados separados con el carácter slash (/) con un archivo o directorio al final.

<p align = 'center'>
<figure>
![Forma típica de una ruta](/img/labs/tutoriales/linux/ruta.jpg)
<figcaption>**Fig 2**. Ruta típica (Imagen tomada de: [Understanding the Linux File System](http://bit.ly/2BDqTQZ))</figcaption>
</figure>
</p>

### 2.2. Directorios especiales 

La siguiente tabla muestra los símbolos especiales empleados en el sistema de archivos linux y los directorios a los cuales estos hacen referencia.

| Símbolo | Directorio especial asociado                                    |
|---------|-----------------------------------------------------------------|
| `/`       | Directorio raíz                                                 |
| `./`      | Directorio actual                                               |
| `../`     | Directorio padre del directorio en el cual me encuentro ubicado |


### 2.3. Tipos de rutas 

Existen 2 tipos de rutas:
* **Rutas Absolutas**: Rutas vistas desde el directorio raíz (`/`).
* **Rutas Relativas**: Rutas vistas desde un directorio en particular.

### 2.4. Ejemplos 

1. Dada la siguiente imagen:
   
   <p align = 'center'>
   <figure>
   ![ejemplo1](/img/labs/tutoriales/linux/ejemplo1.png)
   <figcaption>**Fig 3**. Sistema de archivos ejemplo 1</figcaption>
   </figure>
   </p>

   Responder las siguientes preguntas:
   1. ¿Cuál es la ruta absoluta de `home`?
   2. ¿Cuál es la ruta de `home` relativa a `work`?
   3. Si estoy ubicado en el directorio `home`, ¿Cuál es la ruta absoluta y relativa para ubicarse en `photos`?
   4. Si estoy ubicado en el directorio `jono`, ¿Cuál es la ruta absoluta y relativa para ubicarse en `photos`?
   5. Si estoy ubicado en el directorio `jono`, ¿Cuál es la ruta absoluta y relativa para ubicarse en `lib`?

## 3. Comandos Básicos de GNU/Linux


<table class="tg">
  <tr>
    <th class="tg-yw4l" colspan="2">Comandos de Linux</th>
  </tr>
  <tr>
    <td class="tg-yw4l">`man`</td>
    <td class="tg-yw4l">Muestra el manual de comandos</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`pwd`</td>
    <td class="tg-yw4l">Imprime la ruta del directorio de trabajo actual</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`cd`</td>
    <td class="tg-yw4l">Cambia el directorio de trabajo actual</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`ls`</td>
    <td class="tg-yw4l">Lista los el contenido (archivos y directorios) del directorio de trabajo actual</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`clear`</td>
    <td class="tg-yw4l">Limpia pantalla</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`mkdir`</td>
    <td class="tg-yw4l">Crea un nuevo directorio</td>
  </tr>
  <tr>
    <td class="tg-yw4l">`rm`</td>
    <td class="tg-yw4l">`Borrar directorio`</td>
  </tr>
</table>

### 3.1. Listar Archivos y Directorios

```
ls <opciones> <dir>	
```
El comando `ls` lista los archivos de un directorio, en orden alfanumérico, exceptuando los archivos que empiezan con el carácter "**.**" (archivos ocultos). Los parámetros `opciones` y `dir` no son obligatorios. En lo que respecta al parámetro `dir`cuando no aparece en el comando, los archivos listados son los del directorio de trabajo actual. A continuación se muestran algunos ejemplos:

| Comando | Efecto                                                                                            |
|---------|---------------------------------------------------------------------------------------------------|
|`ls <opciones> <dir>`|Lista archivos del directorio `<dir>`, dadas las `<opciones>` ingresadas por el usuario|
| `ls`                  | Lista los archivos del directorio actual                                  |
| `ls  /ruta/dir`      | Lista los archivos de un directorio específico	                          |

Ambos comandos pueden ser modificados para mostrar información específica, las opciones más usadas son:

| Comando | Efecto                                                             |
|---------|--------------------------------------------------------------------|
| `ls -a` 	| Lista todos los archivos y carpetas incluyendo **ocultos**            |
| `ls -l`   | Lista las **propiedades** de los archivos                             |
| `ls -t`   | Lista **ordenando** por fecha de modificación	                       |
| `ls –m`   | Lista en **una sóla línea** y separados por comas                     |
   
### 3.2. Manual

```
man <comando>	
```

Permite conocer la utilidad y la forma de uso de un comando de forma detallada. Después de ejecutar comando ```man <comando>``` se ingresa al manual del comando, donde el usuario puede navegar por la información presentada usando las flechas del cursor; para salir del manual se usa la tecla **`q`**.

Por ejemplo, para mayor información del comando `ls` se usa el comando: ``` man ls ```

La Figura 4 muestra un ejemplo del uso del comando `ls`, listando archivos y directorios del directorio usr.

<p align = 'center'>
<figure>
![comando ls](/img/labs/tutoriales/linux/comando_ls.png)
<figcaption>**Fig 4**. Uso del comando `ls`</figcaption>
</figure>
</p>

### 3.3. Cambiar el Directorio de Trabajo

```
cd <dir>
```

El comando ```cd``` permite cambiar el directorio de trabajo (**working directory**) al navegar entre nuestros archivos por medio de la terminal. El cambio de directorio de trabajo sólo se lleva a cabo si existe el directorio solicitado, si no es así, el sistema mantiene el directorio de trabajo actual.

Si el cambio de directorio de trabajo se realiza con éxito, el nombre del nuevo directorio de trabajo se muestra en el prompt de la terminal. Con frecuencia se usa el comando ```pwd``` después del comando ```cd``` para verificar el directorio actual.

Algunas de las opciones disponibles para el comando cd son:

| Comando | Efecto                                                             |
|---------|--------------------------------------------------------------------|
| `cd <dir>` 	| Cambia el directorio de trabajo a **`<dir>`**             |
| `cd - `  | Cambia el directorio de trabajo al **`anterior`** directorio de trabajo válido |
| `cd ..`   | 	Cambia el directorio de trabajo al directorio **`padre`**	                       |
| `cd ~`   | Cambia el directorio de trabajo al directorio **`home`** del usuario                 |

La Figura 5 muestra un ejemplo del uso del comando cd. Para mayor información puede consultar el manual del comando: ```man cd```.

<p align = 'center'>
<figure>
![comando cd](/img/labs/tutoriales/linux/comando_cd.png)
<figcaption>**Fig 5**. Uso del comando `cd`</figcaption>
</figure>
</p>

### 3.4. Crear un nuevo directorio

```
mkdir <dir>
```

El comando ```mkdir``` permite crear directorios en un sistema GNU/Linux. Su modo de uso es muy simple, sólo se requiere ingresar en la terminal ```mkdir``` seguido por el nombre de la carpeta a crear.
La Figura 6 muestra un ejemplo del uso del comando `mkdir`. Para mayor información puede consultar el manual del comando: ```man mkdir```.

<p align = 'center'>
<figure>
![comando cd](/img/labs/tutoriales/linux/comando_mkdir.png)
<figcaption>**Fig 6**. Uso del comando `mkdir`</figcaption>
</figure>
</p>

### 3.5. Borrar Archivos y Directorios

```
rm <opc> <ruta o archivo>
```

Si se quiere borrar un directorio en Linux, se puede hacer uso del comando ```rm```. La sintáxis es simple, ```rm``` más la ruta completa (absoluta o relativa) seguida del nombre del archivo a eliminar. A continuación el significado de algunas de las opciones empleadas para este comando:

| Opción | Efecto                                                             |
|---------|--------------------------------------------------------------------|
| `-r` 	| Para un **borrado recursivo** |
| `-f`   | Para un **borrado forzado**. No solicita autorización para cada archivo  |
| `-i`   | 	Para **pedir confirmación**. Solicita autorización por cada archivo borrado |

La Figura 7 muestra un ejemplo del uso del comando rm. Para mayor información puede consultar el manual del comando: ```man rm```.

<p align = 'center'>
<figure>
![comando rm](/img/labs/tutoriales/linux/comando_mkdir.png)
<figcaption>**Fig 6**. Uso del comando `rm`</figcaption>
</figure>
</p>

### 3.6. Copiar Archivos y Directorios

Para copiar directorios y archivos se puede usar el comando ```cp```. La siguiente tabla describe las principales formas de uso de este comando:

| Forma de uso | Descripción                                                            |
|---------|--------------------------------------------------------------------|
| `cp <source_file> <target_file>` | Copia el archivo fuente (`<source_file>`) al destino (`<target_file>`) |
| `cp file1 file2 file3 ... dir`   | Copia los archivos al directorio destino `<dir>` (último argumento)  |
| `cp -­i`  | (Copiado interactivo) Espera por la confirmacion del usuario si el archivo destino ya existe  |
| `cp ­-r <source_dir> <target_dir>`  | (Copiado recursivo) Copia el directorio con los subdirectorios y archivos que éste contenga  |

La Figura 8 muestra un ejemplo del uso del comando cp. Para mayor información puede consultar el manual del comando: ```man cp```.

<p align = 'center'>
<figure>
![comando cp](/img/labs/tutoriales/linux/comando_cp.png)
<figcaption>**Fig 8**. Uso del comando `cp`</figcaption>
</figure>
</p>

#### Ejemplos

Cómo se realizarían las siguientes operaciones empleando el comando `cp`:

1. Realizar la copia de un archivo y dejar la copia en el mismo directorio que el original.
   
   ```
   cp  ArchivoOriginal  ArchivoCopia
   ```

2. Para realizar lo mismo pero con directorios y de forma recursiva
   
   ```
   cp  -r  CarpetaOriginal/  CarpetaCopia/
   ```

3. Se puede especificar que la copia se ponga en otro lugar distinto al de origen
   
   ```
   cp  ArchivoOriginal  /ruta/ArchivoCopia
   ```

4. Obviamente se puede hacer lo mismo con carpetas
   
   ```
   cp  -r  CarpetaOriginal  /ruta/CarpetaCopia
   ```

### 3.7. Mover/Renombrar Archivos y Directorios

Mover archivos y directorios en la terminal equivale a cortar y pegar en modo gráfico; por otro lado, renombrar archivos y directorios equivale a **Cambiar nombre** en entorno gráfico. Nosotros podemos lograr estas dos cosas con el comando ```mv```. La forma de uso básica de este comando se muestra a continuación:

```
mv source_file dest_file
```

La Figura 9 muestra un ejemplo del uso del comando mv. Para mayor información puede consultar el manual del comando: ```man mv```.


<p align = 'center'>
<figure>
![comando mv](/img/labs/tutoriales/linux/comando_mv.png)
<figcaption>**Fig 9**. Uso del comando `mv`</figcaption>
</figure>
</p>

#### Ejemplos
Cómo se realizarían las siguientes operaciones empleando el comando mv:
1. Mover archivo a un directorio especifico.
   
   ```
   mv ArchivoOrigen /LugarDeDestino/ArchivoDestino
   ```

2. Renombrar una carpeta y dejarla en el mismo lugar
   
   ```
   mv NombreOriginal NombreNuevo
   ```

### 3.8. Buscar Archivos y Directorios - Forma 1

El comando ```find``` es usado para buscar archivos o directorios en el sistema de archivos del computador. Este comando tiene diversos modificadores, por lo general la búsqueda mediante terminal es más rápida y consume menos recursos que la búsqueda mediante una aplicación gráfica. A continuación se explican dos opciones del comando:

1. Buscar por nombre:
   
   ```
   find  /lugar_busqueda/ -name nombre_archivo 
   ```

2. Buscar por tamaño: find  /lugar_busqueda/ -size tamañokb
   
   ```
   find  /lugar_busqueda/ -size tamañokb 
   ```

La Figura 10 muestra un ejemplo del uso del comando ```find```. Para mayor información puede consultar el manual del comando: ```man find```.

<p align = 'center'>
<figure>
![comando find](/img/labs/tutoriales/linux/comando_find.png)
<figcaption>**Fig 10**. Uso del comando `find`</figcaption>
</figure>
</p>

#### Ejemplos

Cómo se realizarían las siguientes operaciones empleando el comando `find`:
1. Búsqueda por nombre.
   
   ```
   find /home/usuario/ -name Archivo.tar.gz
   ```
2. Busqueda por tamaño: Buscar archivos de más de 500 KB
   
   ```
   find  /home/usuario/ -size +500
   ```

### 3.9. Buscar Archivos y Directorios - Forma 2

El comando ```locate``` permite encontrar, a través de un nombre o parte de él, la ruta de un archivo dentro del sistema de archivos. El comando locate depende de una base de datos de archivos que se crea con el comando ```updatedb```, el cual crea o actualiza una base de datos con información de todos los archivos en el sistema. ```locate``` no puede encontrar archivos que son creados posteriormente al último llamado de la función ```updatedb```. Antes de efectuar operaciones de búsqueda con locate es bueno actualizar la base de datos. Por ejemplo si quiero encontrar la ruta al archivo **`documento1.txt`** la secuencia de comando sería:

```
sudo updatedb 
locate documento1.txt
```

### 3.10. Limpiar la Terminal

Después de usar un buen tiempo la terminal es probable que nos encontremos confundidos por el texto que se encuentra desplegado en ella. Para limpiar la ventana podemos hacer uso del comando ```clear```. Para borrar la terminal también se puede usar la secuencia de teclado `CTRL + l`.

## 4. Ejercicios de autoevaluacion

1. Basandose en la misma figura del ejemplo 1 (incluida abajo por comodidad) y asumiendo que al ejecutar el comando `pwd` usted se encuentra dentro del directorio `home`
   
   <p align = 'center'>
   <figure>
   ![au1](/img/labs/tutoriales/linux/ejercicio_refuerzo1.png)
   <figcaption>**Fig 11**. Figura ejercicio de autoevaluacion 1</figcaption>
   </figure>
   </p>

   Responda las siguientes preguntas:
   * ¿Cuáles son los comandos para ir y crear el directorio `Italy` dentro de photos?
   * ¿Cuál es el comando para crear el directorio Spain dentro de photos permaneciendo en `home`? 
   * ¿Cuál es el comando (o secuencia de comandos) para crear 2 directorios llamados `dir1` y `dir2` dentro de `work`? 
   * Como se elimina el directorio `dir1` asumiendo que este no esta vacio? 
   * ¿Cuál es el comando (o conjunto de comandos ) para listar el contenido del directorio `jono` con sus propiedades y archivos ocultos?

2. Dada la siguiente figura.
   
   <p align = 'center'>
   <figure>
   ![au2](/img/labs/tutoriales/linux/ejercicio_refuerzo2.png)
   <figcaption>**Fig 11**. Figura ejercicio de autoevaluacion 2</figcaption>
   </figure>
   </p>

   Responda las siguientes preguntas:
   * ¿Cuál es la ruta de `c` relativa a `a`?
   * ¿Cuál es la ruta de `d` relativa a `b`?
   * ¿Cuál es la ruta de `b` relativa a `d`?
   * ¿Cuál es la ruta de `d` relativa a `e`?
   * ¿Cuál es el resultado de ejecutar el comando pwd cuando estamos ubicados en `d`?
   * ¿Cuál es comando para pasar de `e` a `d` (de ambas formas, es decir usando ruta absoluta y usando ruta relativa)?
   * ¿Cuál es comando para pasar de `c` a `b` (de ambas formas)?
   * ¿Cuál es el resultado de ejecutar el comando `pwd` cuando estamos ubicados en `d`?
   * ¿Cuál es comando para pasar de `e` a `d` (de ambas formas)?
   * ¿Cuál es comando para pasar de `c` a `b` (de ambas formas)?

3. Dada la siguiente figura (la cual tiene dos salidas de consola).
   
   <p align = 'center'>
   <figure>
   ![au3](/img/labs/tutoriales/linux/ejercicio_refuerzo3.png)
   <figcaption>**Fig 12**. Figura ejercicio de autoevaluacion 3</figcaption>
   </figure>
   </p>

   Preguntas:
   * ¿Cuál es la diferencia entre las dos salidas de consola?


## 5. Entregable

1. Realizar el curso: [Introduction to Shell for Data Science](https://www.datacamp.com/courses/introduction-to-shell-for-data-science) evidenciando el trabajo llevado a cabo.
2. **Punto opcional (por si quiere aprender mas)**:Resolver los ejercicios de la página [learnshell.org](http://www.learnshell.org/)

## 6. Referencias
* [Understanding the Linux File System](http://bit.ly/2BDqTQZ)
* [The Unix and GNU/Linux command line](https://bootlin.com/doc/legacy/command-line/unix_linux_introduction.pdf)
* [GNU/Linux command memento](https://bootlin.com/doc/legacy/command-line/command_memento.pdf)
* [8 Useful Shell Commands For Data Science](https://www.datacamp.com/community/tutorials/shell-commands-data-scientist)
* [Top 5 Free Courses to Learn Linux Commands in Depth](https://dzone.com/articles/5-free-courses-to-learn-linux-commands-in-depth)
* [Linux Command Line Basics - Getting Started with the Shell](https://www.udacity.com/course/linux-command-line-basics--ud595)
* [Top 5 Free Linux Courses for Programmers](https://hackernoon.com/top-5-free-linux-courses-for-programmers-4a433b4edade)
* [https://www.edx.org/course/introduction-to-linux](https://www.edx.org/course/introduction-to-linux)
* [Introducción a la programación en C: Tipos de datos y estructuras](https://www.edx.org/course/introduccion-a-la-programacion-en-c-tipos-de-datos)
* [C Programming: Language Foundations](https://www.edx.org/course/c-programming-language-foundations)
* [Unix Terminal Online](https://www.tutorialspoint.com/unix_terminal_online.php) 
* [learnshell.org](http://www.learnshell.org/)
* [Manual práctico de Linux con ejercicios](http://www.edu.xunta.gal/centros/iesfelixmuriel/system/files/manual_practico_de_linux_alumnos.pdf)
* [Unix/Linux Reference Card](http://www.facom.ufu.br/~nascimento/Linux_Reference_Card.pdf)
* [Introducción al sistema operativo GNU/Linux](http://openaccess.uoc.edu/webapps/o2/bitstream/10609/61286/1/Administraci%C3%B3n%20de%20sistemas%20GNU_Linux_M%C3%B3dulo1_Introducci%C3%B3n%20al%20sistema%20operativo%20GNU_Linux.pdf)
