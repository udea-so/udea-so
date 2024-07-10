---
sidebar_position: 4
label: "gdb"
Description: "Tutorial sobre gdb"
---

# GDB

## 1. Antes de empezar 

### 1.1. Paso 1
Revise el contenido de apoyo descrito a continuación:
1. [GDB Tutorial A Walkthrough with Examples](/pdfs/gdb/gdb-tutorial-handout.pdf)
2. [gdb Cheatsheet](/pdfs/gdb/gdb.pdf)
3. [GDB Cheat Sheet](/pdfs/gdb/GDB-cheat-sheet.pdf)


### 1.2. Paso 2 

Complemente el contenido anterior viendo el video: **GDB - CS50 Shorts** ([link](https://www.youtube.com/watch?reload=9&v=G4OIp_5fF1A)) mostrado a continuación:

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/G4OIp_5fF1A?si=pmv-chlSXJ9TL44z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

En este se hace uso de una aplicación online muy buena llamada [https://ide.cs50.io/](https://ide.cs50.io/). 

### 1.3. Paso 3 

Para el laboratorio se hará uso del **`gdb`** disponible en la maquina con linux. Sin embargo lo animamos a que haga uso de otras alternativas más amigables como [onlinegdb](https://www.onlinegdb.com/) o [gdbgui](https://www.gdbgui.com/).

## 2. Primeros pasos con el `gdb`

### 2.1. Codificación del programa 

Codifique el siguiente programa guardandolo como ```main.c```

```C showLineNumbers
#include <stdio.h>

int main() {
  int f1 = factorial(4);
  int f1 = factorial_recursivo(5);
  printf("4! = %d\n",f1);
  printf("5! = %d\n",f2);
  return 0;
}

int factorial(int num){
  fac = 1;
  for(int = 1; i <= num;i++) {
    fac = fac*i;  
  }
  return fac;
}

int factorial_recursivo(int num){
  if(num  > 0) {
    return num*factorial_recursivo(num - 1);
  }
  else {
    return 1;
  }
}
```

Usando el siguiente comando compilelo, si tiene errores corrijalo:

```
gcc -Wall -g main.c -o main.out
```

**Preguntas**

1. Como se puede notar, se observa un nuevo parametro en el gcc, este es ```-g```. ¿Que significa este?

Una vez que tenga todo corregido continue los pasos dados en la siguiente sección:

### 2.2. Explorando los comandos

#### 2.2.1. Arrancando el gdb 

Para iniciar el **gdb** se emplea el comando ```gdb```, sin embargo usar este solo hacer el debug no es amigable asi que se recomuenta agregar el parametro adicional ```-tui```. De este modo, el comando será:

```
gdb -tui
```

Una vez se esta dentro del ```gdb``` se carga la consola de este esperando la entrada de comandos propios del ```gdb```. Esta tiene la siguiente forma:

```
(gdb) 
```

#### 2.2.2. Conociendo los comandos disponibles

Para tal fin se usan los comandos:
* ```help```
* ```help all```
* ```help [comando]```
* ```apropos word```

#### 2.2.3. Cargando un archivo en el gdb

Una vez el gdb arranco (```gdb -tui```) se carga un archivo mediante el comando:

```
file nombreEjecutable
```

Asi para nuestro caso como el ejecutable se llama **`main.out`** el comando será:

```
file main.out
```

El resultado de esto aparece a continuación:

<p align = 'center'>
<figure>
![load_file](/img/labs/tutoriales/gdb/load_file_gdb.jpg)
<figcaption>**Fig 1**. Salida del comando `file`.</figcaption>
</figure>
</p>

#### 2.2.4. Visualizando el archivo fuente cargado en el gdb 

El comando mas practico para esto es ```[l]ist```, en los documentos de las referencias puede encontrar mas exacamente como usar este comando. Por ahora vamos a ejecutar los siguientes comandos (asumiendo que ya se cargo el archivo en el  gdb):

```
# Comando 1
l
# Comando 2
l
# Comando 3
l
```

La salida es algo como lo siguiente:

<p align = 'center'>
<figure>
![load_file](/img/labs/tutoriales/gdb/load_file_gdb.jpg)
<figcaption>**Fig 2**. Salida del comando `list`.</figcaption>
</figure>
</p>

Continuando con la aplicación de los comandos tenemos:

```
# Comando 4
l 1
```

<p align = 'center'>
<figure>
![list2](/img/labs/tutoriales/gdb/list2.jpg)
<figcaption>**Fig 3**. Salida del comando `list`.</figcaption>
</figure>
</p>

:::info
```l``` es el abreviado de ```list```.
:::

#### 2.2.5. Ejecutando el archivo en el gdb 

Con el comando list anteriormente mencionado se pudo visualizar el condigo fuente del ejecutable al cual se le esta haciendo el debuging. Con el comando ```run``` se ejecuta el programa:

```
run
```

<p align = 'center'>
<figure>
![run](/img/labs/tutoriales/gdb/run.jpg)
<figcaption>**Fig 4**. Comando `run`.</figcaption>
</figure>
</p>

Una vez ejecutado el programa, si lo que se quiere es ejecutarlo nuevamente se puede correr nuevamente este comando.

#### 2.2.6. Colocando breakpoints ####

Un **breakpoint** hace referencia a un punto de parada en la ejecución del codigo. Estos son muy comunes para el desarrollo de pruebas de escritorio ya que permiten ir evaluando el estado de las variables a medida que el programador va moviendose entre estos. El comando para poner un breakpoint es ```[b]reak``` y sus diferentes variantes pueden consultarse en las referencias de apoyo dispuestas. Por ahora ejecutemos los siguientes comandos. Antes de esto tenga en cuenta que el abreviado  del comando ```break``` es ```b``` y es con este ultimo que se ejecutan los ejemplos:

```
# Comando 1
b 4
# Comando 2
break 9
# Comando 3
b factorial
```

La siguiente figura muestra el resultado:

<p align = 'center'>
<figure>
![break1](/img/labs/tutoriales/gdb/break1.jpg)
<figcaption>**Fig 5**. Uso del comando `break`.</figcaption>
</figure>
</p>

Notese de la figura anterior, los simbolos **b+** agregados a la izquierda del codigo. Es alli donde se colocaron los breakpoints. Es bueno vez colocados los breakpoints listarlos, para ello se usa el comandos:

```
# Comando 4
info breakpoints
```

La siguiente figura muestra el resultado:

<p align = 'center'>
<figure>
![info_break](/img/labs/tutoriales/gdb/info_break.jpg)
<figcaption>**Fig 6**. Salida con la información de los breakpoints al usar el comando `info breakpoints`.</figcaption>
</figure>
</p>


Notese que cada breakpoint tiene información asociada a este pero resaltamos la primera columna en la cual se puede ver el numero del breakpoint. Conocer este numero es importante por que es el que se emplea para eliminar o desabilitar un breakpoint determinado. Para ello vamos a realizar las siguientes tareas:
1. Agregar un breakpoint en la función ```factorial_recursivo```
   
   ```
   # Comando 5
   break factorial_recursivo
   ```
    
2. Listar los breakpoints disponibles.
   
   ```
   # Comando 6
   info breakpoints
   ```

   En la siguiente figura se muestra el resultado:

   <p align = 'center'>
   <figure>
   ![info_break2](/img/labs/tutoriales/gdb/info_break2.jpg)
   <figcaption>**Fig 7**. Comando `info breakpoints`.</figcaption>
   </figure>
   </p>

3. Deshabilitar el breakpoint anteriormente agregado (ojo tenga en cuenta el numero de este).
   
   ```
   # Comando 7
   disable 4
   ```
   
4. Listar los breakpoints disponibles para ver los cambios.
   
   ``` 
   # Comando 8
   info breakpoints
   ```

   En la siguiente figura se muestra el resultado despues de aplicar los comandos anteriormente mencionados. Observe los cambios:

   <p align = 'center'>
   <figure>
   ![info_break3](/img/labs/tutoriales/gdb/info_break3.jpg)
   <figcaption>**Fig 8**. Comando `info breakpoints`.</figcaption>
   </figure>
   </p>

5. Eliminar el breakpoint anterior y listar nuevamente los breakpoints disponibles para ver los cambios. 

   ```
   # Comando 9
   delete 4

   # Comando 10
   info breakpoints
   ```

   Para el caso, en la siguiente figura se muestra el resultado:

   En la siguiente figura se muestra el resultado. Observe los cambios:

   <p align = 'center'>
   <figure>
   ![info_break4](/img/labs/tutoriales/gdb/info_break4.jpg)
   <figcaption>**Fig 8**. Comando `info breakpoints` despues de la eliminación de un brakpoint.</figcaption>
   </figure>
   </p>

#### 2.2.7. Moviendonos entre los breakpoints y observando la evolución de las variables ####

Para movernos entre los breakpoints se usa la instrucción ```[c]ontinue``` (donde ```c``` es el abreviado de ```continue```) sin argumentos (pues tambien admite argumentos pero para nuestros propositos no lo vamos a profundizar). Por otro lado, para ver el estado de las variables se procede a usar el comando ```print```. Realicemos las siguientes tareas para comprender en su forma mas basica el uso conjunto de estas:

1. Agregue un breakpoint en la linea 17.
   
   ```
   # Comando 1
   b 17

   # Comando 2
   info breakpoints
   ```

   El resultado se muestra en la siguiente figura:

   <p align = 'center'>
   <figure>
   ![continue1](/img/labs/tutoriales/gdb/continue1.jpg)
   <figcaption>**Fig 9**. Comando `info breakpoints`.</figcaption>
   </figure>
   </p>

2. Empieze la ejecución del programa con run. Observe donde se detiene el programa e imprima el contenido de las variables ```f1``` y ```f2```.

   ```
   # Comando 3
   run

   # Comando 4
   print f1

   # Comando 5
   print f2
   ```

   El resultado se muestra en la siguiente figura:

   <p align = 'center'>
   <figure>
   ![continue2](/img/labs/tutoriales/gdb/continue2.jpg)
   <figcaption>**Fig 10**. Comando `print`.</figcaption>
   </figure>
   </p>


   Notese en la figura anterior, que la linea en la que se encuentra el primer breakpoint queda resaltada. Tenga en cuenta que esta, aun no se he ejecutado.

3. Ejecute el comando ```continue``` y luego imprima el contenido de las variables ```fac``` y ```f1```. ¿Que es lo que se imprime para estas y por que?

   ```
   # Comando 6
   c

   # Comando 7
   print fac

   # Comando 8
   print f1
   ```

   El resultado se muestra en la siguiente figura:

   <p align = 'center'>
   <figure>
   ![continue3](/img/labs/tutoriales/gdb/continue3.jpg)
   <figcaption>**Fig 11**. Comando `print`.</figcaption>
   </figure>
   </p>

   Notese que ya el programa se encuentra en la linea **15**. 

4. Agregue un breakpoint en la linea **17** y verifique que este se ha agregado:

   ```
   # Comando 9
   b 17

   # Comando 10
   info breakpoints
   ```  

   La salida se muestra a continuación:

   <p align = 'center'>
   <figure>
   ![continue4](/img/labs/tutoriales/gdb/continue4.jpg)
   <figcaption>**Fig 12**. Comando `info breakpoints`.</figcaption>
   </figure>
   </p>

5. Proceda con un ```continue``` e imprima ```fac```.

   ```
   # Comando 11
   c

   # Comando 12
   print fac
   ``` 

   La salida se muestra a continuación:

   <p align = 'center'>
   <figure>
   ![continue5](/img/labs/tutoriales/gdb/continue5.jpg)
   <figcaption>**Fig 12**. Comando `print`.</figcaption>
   </figure>
   </p>

6. Ejecute dos veces ```continue``` e imprima el valor de la variable ```fac```.

   ```
   # Comando 13
   c

   # Comando 14
   c

   # Comando 15
   print fac
   ``` 

   La salida se muestra a continuación (**nota**: No se ejecuto aqui exactamente la misma lista de comandos, pues, se ejecuto un print mas despues del primer continue):

   <p align = 'center'>
   <figure>
   ![continue6](/img/labs/tutoriales/gdb/continue6.jpg)
   <figcaption>**Fig 13**. Comando `print`.</figcaption>
   </figure>
   </p>

7. Mire el numero al que corresponde el breakpoint de la linea **17**, luego deshabilitelo y compruebe esto.

   ```
   # Comando 16
   info breakpoints

   # Comando 17 (corresponde al breakpoint 6)
   disable 6

   # Comando 18
   info breakpoints
   ``` 

   La salida se muestra a continuación:

   <p align = 'center'>
   <figure>
   ![continue7](/img/labs/tutoriales/gdb/continue7.jpg)
   <figcaption>**Fig 14**. Comando `print`.</figcaption>
   </figure>
   </p>

8. Nuevamente ejecute la cantidad de comandos ```continue``` hasta que el codigo llegue al breakpoint de la linea **9**. Luego imprima le contenido de las variables ```f1``` y ```f2```.

   ```
   # Comando 19
   c

   # Comando 20
   c

   # Comando 21
   print f1

   # Comando 22
   print f2
   ``` 

   La salida se muestra a continuación:

   <p align = 'center'>
   <figure>
   ![continue8](/img/labs/tutoriales/gdb/continue8.jpg)
   <figcaption>**Fig 15**. Comando `print`.</figcaption>
   </figure>
   </p>

#### 2.2.8. Step - Next - Finish 

Estos dos comandos permiten ejecución paso a paso pero tienen una diferencia sutil. En lo que respecta al comando ```[s]tep```, este ejecuta la siguiente linea de codigo fuente pero si esta esta invocando una función, se entrará en esta; en lo que se refiere al comando ```[n]ext```, este tambien ejecuta la proxima linea de código pero a diferencia de ```step``` no desciente a la función que se invoca si la proxima linea del codigo esta asociada a esta.

Otro comando importante es el ```finish``` que continua la ejecución de una función hasta que encuentra el ```return``` asociado a esta.

Para comprender estos comandos un poco mas vamos a realizar las siguientes tareas.

1. Salgase del ```gdb``` y luego ingrese nuevamente cargando el archivo ejecutable ```main.out```.

   ```
   quit
   ```

   Iniciando nuevamente el gdb y cargando ```main.out```

   ```
   gdb -tui main.out
   ```

2. Coloque un breakpoint en la función main e inicie la ejecución:

   ```
   # Comando 1
   b main

   # Comando 2
   run
   ```

   La salida se muestra a continuación:

   ![nsf1](/img/labs/tutoriales/gdb/nsf1.jpg)

3. Ejecute el comando ```step``` y luego imprima las variables ```num``` y ```fac```:

   ```
   # Comando 4
   step

   # Comando 5
   print num

   # Comando 6
   print fac
   ```

   La salida se muestra a continuación:

   ![nsf2](/img/labs/tutoriales/gdb/nsf2.jpg)

4. Ejecute el numero de veces que sea necesario el comando step imprimiento la variable  ```fac``` para ver su evolución hasta que esta alcance el valor de 2:

   ```
   # Comando 7
   s

   # Comando 8
   print fac

   # Comando 9
   # Continuar reiterativamente ele proceso anterior
   ```

   La salida se muestra a continuación:

   ![nsf3](/img/labs/tutoriales/gdb/nsf3.jpg)

5. Ejecute el comando ```finish``` e imprima el valor de ```f1```:

   ```
   finish

   print f1
   ```

   La salida se muestra a continuación:

   ![nsf4](/img/labs/tutoriales/gdb/nsf4.jpg)


6. Ejecute dos veces el comando ```next``` imprimiendo el valor de ```f2```  despues de cada uno de estos:

   ```
   n

   print f2
 
   n

   print f2
   ```

   La salida se muestra a continuación:

   ![nsf5](/img/labs/tutoriales/gdb/nsf5.jpg)

7. Ejecute el comando ```continue``` para acabar:


   ```
   continue
   ```

   La salida se muestra a continuación:

   ![nsf6](/img/labs/tutoriales/gdb/nsf6.jpg)


## 3. Conclusiones ##

Hasta el momento solo vimos el uso mas básico del debuger de linux en modo texto. Esta es una herramienta sumamente poderosa y cuenta con una gran cantidad de comandos para probar codigo fuente. El proposito del curso no es profundizar en el manejo de este por lo que lo animamos a que lo cacharee, esa es la mejor forma de aprender.

## 4. Refencias ##
Ademas de los enlaces y fuentes ya compartidas agregamos algunos enlaces mas para que consulte y profundice en el tema:
1. [GNU GDB Debugger Command Cheat Sheet](http://www.yolinux.com/TUTORIALS/GDB-Commands.html)
2. [Quick Guide to Gdb](https://condor.depaul.edu/glancast/373class/docs/gdb.html)
---

* https://engineering.purdue.edu/ece264/24su/schedule
* https://www3.ntu.edu.sg/home/ehchua/programming/index.html
* https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html
* https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html
* https://www3.ntu.edu.sg/home/ehchua/programming/howto/Unix_Basics.html
* https://github.com/juanferfranco/OOP-in-C?tab=readme-ov-file
* https://github.com/juanferfranco/sistemasoperativos
* https://github.com/juanferfranco/sistemasoperativos/blob/master/docs/_unidad1/introGit.rst
* https://github.com/juanferfranco/sistemasoperativos/blob/master/docs/_unidad1/introC.rst
* https://github.com/juanferfranco/sistemasoperativos/blob/master/docs/_unidad2/unidad2.rst
* https://github.com/juanferfranco/sistemasoperativos/blob/master/docs/_unidad3/unidad3.rst
