---
sidebar_position: 5
label: "valgrind"
Description: "Tutorial sobre valgrind"
---

export const Highlight = ({ text, backgroundColor }) => {
  const style = {
    backgroundColor: backgroundColor || 'yellow', // Default color is yellow if not provided
  };
  return <span style={style}>{text}</span>;
};


# Valgrind

:::tip[Objetivos]
* Objetivo...
:::

## 1. Antes de empezar

### 1.1. Antes de empezar

Antes de empezar con la revisión de este material, se recomienda que revise la página **Tutorial de Valgrind y Helgrind** ([link](https://docs.utnso.com.ar/guias/herramientas/valgrind)). 

Como material de consulta adicional se proporciona el siguiente marterial (reviselo para profundizar conceptos claves) a los siguientes documentos:
1. **Valgrind Quick Reference Guide** [[link]](/pdfs/valgrind/Valgrind_Quick_Reference_Guide.pdf)
2. **Debugging with GDB and Valgrind** [[link]](/pdfs/valgrind/gdb-valgrind_cheatsheet.pdf)
3. **Valgrind HOWTO** [[link]](/pdfs/valgrind/Valgrind-HOWTO.pdf)
4. **Manual Rápido de Valgrind CC31A** de José Miguel Piquer y equipo [[link]](/pdfs/valgrind/valgrind.pdf)
5. **Valgrind - Tutorial basico de Memcheck** [[link]](/pdfs/valgrind/valgrind_slide.pdf)
6. **Valgrind** de David Gunter [[link]](/pdfs/valgrind/gunter_valgrind.pdf)

:::info
Gran parte del material que se empleo para esta documentación proviene del curso de **Sistemas Operativos** ([link](https://docs.utnso.com.ar/)) de la [UTN.BA](https://www.frba.utn.edu.ar/). 
:::

### 1.2. Mapa de memoria

Poner algo sobre el mapa de memoria a modo de recuerdo...


### 1.3. Manejo de memoria

Colocar algunas funciones de manejo de memoria...





<!--
3. [Valgrind Debugging	Utility](/pdfs/valgrind/Valgrind.pdf)
-->


## 2. Sobre el valgrind

**Valgrind** es una colección de herramientas que pueder usadas para realizar diferentes tipos de analisis en programas. Para mas información puede consultar la pagina oficial: www.valgrind.org

### 2.1. Promeros pasos

Usar Valgrind se resume en tres pasos basicos:
1. Compilar.
2. Usar el Valgrind 
3. Analizar los resultados.

A continuación vamos a tratar con mas detalle cada paso.

#### 2.1.1. Compilar

Despues codificar el programa en c, se procede a generar el ejecutable mediante el compilador `gcc`. Es importante que cuando lleve a cabo la compilación use la bandera `-g` para agregar información de debug que facilite el analisis de los resultados. Por ejemplo, si el archivo fuente es `myprog.c` y queremos generar un ejecutable llamado `myprog.out` el comando de compilación sería de la siguiente forma:

```
gcc -Wall -g myprog.c -o myprog.out
```

#### 2.1.2. Usar el valgrind

En general, para invocar el `valgrind` se usa el siguiente comando:

```
valgrind [valgrind-options] your-prog [your-prog-options]
```

Como se menciono con anterioridad, `valgrind` dispone de diferentes herramientas para realizar el analisis de los programa. Para seleccionar la herramienta que empleará  `valgrind` se emplea la opción `--tool` (que es la mas importante). La selección de la **herramienta** ([link](https://docs.redhat.com/es/documentation/red_hat_enterprise_linux/6/html/performance_tuning_guide/s-memory-valgrind#s-memory-valgrind)) es de la forma `--tool=<name>`, donde `<name>` es la herramienta que usará Valgrind. La siguiente tabla muestra algunas de las opciones:

|Herramienta|Comando|Descripción|
|---|---|---|
|**`Memcheck`**|`--tool=memcheck`|Herramienta empleada para detectar errores de memoria. Esta comprueba todas las lecturas y escrituras y las llamadas a `malloc/new/free/delete`. Es la opción por defecto.|
|**`Callgrind`**|`--tool=callgrind`|Es una extensión `Cachegrind` que produce información extra sobre las **callgraphs**.|
|**`Helgrind`**|`--tool=helgrind`|Es un thread debugger para la detección de errores (data races por ejemplo) en programas multi-hilo.|
|**`Massif`**|`--tool=massif`|Esta herramienta es un **heap profiler** sirve para perfilar el uso de memoria en el programa, identificando las áreas que consumen más memoria.|
|**`Cachegrind`**|`--tool=cachegrind`|Esta herramienta permite analizar el rendimiento de la caché y detectar patrones de acceso a la memoria.|

Teniendo en cuenta lo anterior, si se desea ejecutar el comando `ls -l` usando la herramienta para comprobación memoria de memoria (`memcheck`), la forma como se usaría el comando sería:

```
valgrind --tool=memcheck ls -l
```

### 2.1.3. Analizar los resultados

Los resultados arrojados por el  `valgrind` son enviados a salida estandar por defecto. Sin embargo, a veces cuando analizar los resultados en pantalla se vuelve engorroso, es util direccionar estos resultados a un archivo de texto empleando la opción `--log-file=outfile`. Por ejemplo, si ubiesemos querido llevar la salida del comando anterior al archivo `log.txt` el comando a emplear seria:

```
valgrind --tool=memcheck --log-file=log.txt ls -l
```

:::info
Para conocer mas sobre como usar **`Vagrind`** puede consultar el manual (`man valgrind`) o la ayuda (`valgrind --help`)
:::

### 2.2. Ejemplo sencillo

El contenido del archivo `a.c` se muestra a continuación:

```c showLineNumbers
#include <stdlib.h>

void f(void) {
  int* x = malloc(10 * sizeof(int));
  x[10] = 0;        // problem 1: heap block overrun
}                   // problem 2: memory leak -- x not freed

int main(void) {
  f();
  return 0;
}
```

Mediante el uso de la herramienta `Memcheck` de `valgrind` determine si el programa tiene errores de memoria. 

Vamos a proceder a realizar el analisis:
1. **Compilar**: Asumiendo que el ejecutable se llamará `a.out` el comando de `gcc` empleado será:
   
   ```
   gcc -Wall -g a.c
   ```

2. **Ejecutar Valgrind**: En este caso como se realizará un analisis de memoria, la herramienta a usar sera `--tool=memcheck`, de modo que siendo `a.out` el ejecutable, el comando a emplear será:
   
   ```
   valgrind --tool=memcheck ./a.out
   ```

3. **Analizar los resultados**: Si todo esta bien, la salida al ejecutar el comando anterior, será simular a la mostrada a continuación:
   
   <p align = 'center'>
   <figure>
   ![lib_dinamica](/img/labs/tutoriales/valgrind/salida_valgrind.png)
   <figcaption>**Fig 1**. Salida del comando `valgrind` para el ejecutable `a.out`.</figcaption>
   </figure>
   </p>

   Las partes mas relevantes de la salida anterior se resaltan a continuación:

   ```sh
   ==113== Memcheck, a memory error detector
   ==113== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
   ==113== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
   ==113== Command: ./a.out
   ==113==
   ==113== error calling PR_SET_PTRACER, vgdb might block
   # highlight-start
   ==113== Invalid write of size 4
   ==113==    at 0x10916B: f (a.c:5)
   ==113==    by 0x109180: main (a.c:9)
   ==113==  Address 0x4a4a068 is 0 bytes after a block of size 40 alloc'd
   ==113==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
   ==113==    by 0x10915E: f (a.c:4)
   ==113==    by 0x109180: main (a.c:9)
   # highlight-end
   ==113==
   ==113==
   ==113== HEAP SUMMARY:
   ==113==     in use at exit: 40 bytes in 1 blocks
   ==113==   total heap usage: 1 allocs, 0 frees, 40 bytes allocated
   ==113==
   # highlight-start
   ==113== LEAK SUMMARY:
   ==113==    definitely lost: 40 bytes in 1 blocks
   ==113==    indirectly lost: 0 bytes in 0 blocks
   ==113==      possibly lost: 0 bytes in 0 blocks
   ==113==    still reachable: 0 bytes in 0 blocks
   ==113==         suppressed: 0 bytes in 0 blocks
   # highlight-end
   ==113== Rerun with --leak-check=full to see details of leaked memory
   ==113==
   ==113== For lists of detected and suppressed errors, rerun with: -s
   # highlight-start
   ==113== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
   # highlight-end
   ```
   En resumen, los errores se deben:
   1. Se creo un array `x` de `10` enteros, sin embargo, se accedió a una dirección invalida, pues el maximo indice valido es 9, no 10.
   2. No se liberó, usando `free`, el espacio que se reservo mediante `malloc` reservado en el heap.

   La interpretación consiste en analizar el contenido del log anteriormente lanzado para analizar donde se encuentran los errores. Para mas información sobre la información anteriormente desplegada lo invitamos a que consulte el siguiente **The Valgrind Quick Start Guide** ([link](https://valgrind.org/docs/manual/quick-start.html)) del cual se tomo el ejemplo.

   
4. El código con los errores corregidos se muestra a cóntinuación. 
   
   ```c {5,6} showLineNumbers 
   #include <stdlib.h>

   void f(void) {
    int* x = malloc(10 * sizeof(int));
    x[9] = 0;        
    free(x);
   }                  

   int main(void) {
     f();  
     return 0;
   }
   ```

   Volviendo a compilar el archivo fuente tenemos:

   ```
   gcc -Wall -g a.c
   ```
   
   Luego si procedemos a usar `valgrind` nuevamente:

   ```
   valgrind --tool=memcheck ./a.out
   ```
   
   La salida arrojada no mostrará errores tal y como se resalta a continuación al final del log:

   ```sh
   ==120== Memcheck, a memory error detector
   ==120== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
   ==120== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
   ==120== Command: ./a.out
   ==120==
   ==120== error calling PR_SET_PTRACER, vgdb might block
   ==120==
   ==120== HEAP SUMMARY:
   ==120==     in use at exit: 0 bytes in 0 blocks
   ==120==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
   ==120==
   ==120== All heap blocks were freed -- no leaks are possible
   ==120==
   ==120== For lists of detected and suppressed errors, rerun with: -s
   # highlight-start
   ==120== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
   # highlight-end
   ```

## 3. Analisis de memoria usando `valgrind`

Tal y como se mencionó con anterioridad, mediante la herramienta **``Memcheck`** de **`valgrind`** es posible encontrar e identificar errores de memoria. Algunos de los tipos de memoria que se pueden identificar mediante el uso de esta herramienta son:
* Uso de memoria no inicializada.
* Lectura o escritura de memoria liberada con `free`
* Lectura o escritura fuera del area reservada con `malloc`
* Lectura o escritura inapropiada de la pila
* **Memory leaks** (fugas de memoria), cuando se pierden los punteros a un área de memoria pedida con `malloc`
* Correspondencia entre `malloc` y `free`
* Traslape de memoria de origen y destino en `memcpy` y funciones relacionadas

Cuando se usa la herramienta para analisis de memoria (`--tool=memcheck`), se pueden emplear otras opciones adicionales para configurar los resultados de la salida tal y como lo describe la siguiente tabla:

|Opción|Descripción|
|---|---|
|`--leak-check=yes\|full\|no\|summary [default: summary]`|Hace que Valgrind muestre las fugas de memoria cuando terminar el programa analizado. El valor por defecto es `summary`; las otras opciones con `no` para desactivar la opción; `yes` para informar sobre cada fuga de memoria y `full` que proporciona una salida más detallada, mostrando todos los tipos de pérdidas de memoria.  |
|`--leak-resolution=low\|med\|high [default: high]`|Muestra información detallada sobre las fugas de memoria.|
|`--track-origins=no\|yes [default: no]`|Muestra el origen de variable no definidas|
|`--log-file=outfile`| Guarda la salida de Valgrind en el archivo llamado `outfile`. Es util cuando se hace dificil analizar los resultados arrojados en la consola cuando la salida es muy grande.|

:::info
Para conocer de manera resumida la herramienta revise el siguiente resumen: **Valgrind Quick Reference Guide** [[link]](/pdfs/valgrind/Valgrind_Quick_Reference_Guide.pdf)
:::

A continuación se van a analizar diferentes casos de errores de memoria que pueden ser detectados mediante el uso de `valgrind`.

### 3.1. Caso de uso: Memcheck – Uninitialized Memory


4.2.3.1. Use of uninitialized memory
Sources of uninitialized data are:
· local variables that have not been initialized.
· The contents of malloc'd blocks, before writing something there.

This is not a problem with calloc since it initializes each allocated bytes with 0. The new operator in C++
is similar to malloc. Fields of the created object will be uninitialized.

```c {5} showLineNumbers
#include <stdlib.h>

int main() { 
  int p, t;
  if (p == 5) /*Error occurs here*/
    t = p + 1;
  return 0;
}
```

```
gcc -Wall -g example1.c -o example1.out
```

p is uninitialized and may contain garbage, resulting in an error if used to determine
branch-outcome or memory address (ex: a[p] = y)

```
valgrind --leak-check=yes --track-origins=yes ./example1.out
```

```sh
==132== Memcheck, a memory error detector
==132== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==132== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==132== Command: ./example1.out
==132==
==132== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==132== Conditional jump or move depends on uninitialised value(s)
==132==    at 0x109135: main (example1.c:5)
# highlight-end
==132==
==132==
==132== HEAP SUMMARY:
==132==     in use at exit: 0 bytes in 0 blocks
==132==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==132==
==132== All heap blocks were freed -- no leaks are possible
==132==
==132== Use --track-origins=yes to see where uninitialised values come from
==132== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==132== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
# highlight-end
```

```
valgrind --leak-check=yes --track-origins=yes ./example1.out
```

```sh
==134== Memcheck, a memory error detector
==134== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==134== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==134== Command: ./example1.out
==134==
==134== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==134== Conditional jump or move depends on uninitialised value(s)
==134==    at 0x109135: main (example1.c:5)
==134==  Uninitialised value was created by a stack allocation
==134==    at 0x109129: main (example1.c:3)
# highlight-end
==134==
==134==
==134== HEAP SUMMARY:
==134==     in use at exit: 0 bytes in 0 blocks
==134==   total heap usage: 0 allocs, 0 frees, 0 bytes allocated
==134==
==134== All heap blocks were freed -- no leaks are possible
==134==
==134== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==134== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
# highlight-end
```

------------

p is uninitialized and
may contain garbage,
resulting in an error if
used to determine
branch-outcome or
memory address
(ex: a[p] = y)

------------------------------

### 3.2. Caso de uso: Memcheck – Illegal read/write

Illegal read/write errors occurs when you try to read/write from/to an address that is not in the address range
of your program.

```c {6,7} showLineNumbers
#include <stdlib.h>

int main() {
  int *p, i, a;
  p = malloc(10*sizeof(int));
  p[11] = 1; /* invalid write error */
  a = p[11]; /* invalid read error */
  free(p);
  return 0;
}
```
Here you are trying to read/write from/to address (p+sizeof(int)*11) which is not allocated to the program.

Attempting to read/write
from address
(p+sizeof(int)*11)
which has not been
allocated

```
gcc -g -Wall example2.c -o example2.out
```

```
valgrind --tool=memcheck --leak-check=yes ./example2.out
```

Salida

```sh
==141== Memcheck, a memory error detector
==141== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==141== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==141== Command: ./example2.out
==141==
==141== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==141== Invalid write of size 4
==141==    at 0x10918B: main (example2.c:6)
==141==  Address 0x4a4a06c is 4 bytes after a block of size 40 alloc'd
==141==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==141==    by 0x10917E: main (example2.c:5)
# highlight-end
==141==
# highlight-start
==141== Invalid read of size 4
==141==    at 0x109195: main (example2.c:7)
==141==  Address 0x4a4a06c is 4 bytes after a block of size 40 alloc'd
==141==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==141==    by 0x10917E: main (example2.c:5)
# highlight-end
==141==
==141==
==141== HEAP SUMMARY:
==141==     in use at exit: 0 bytes in 0 blocks
==141==   total heap usage: 1 allocs, 1 frees, 40 bytes allocated
==141==
==141== All heap blocks were freed -- no leaks are possible
==141==
==141== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==141== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
# highlight-end
```

--------------

### 3.3. Caso de uso: Memcheck – Invalid free

Valgrind keeps track of blocks allocated to your program with malloc/new. So it can easily check whether
argument to free/delete is valid or not.

```c {9} showLineNumbers
#include <stdlib.h>

int main() {
  int *p, i;
  p = malloc(10*sizeof(int));
  for(i = 0;i < 10;i++)
    p[i] = i;
  free(p);
  free(p); /* Error: p has already been freed */
  return 0;
}
```

Valgrind checks the address, which is given as argument to free. If it is an address that has already been freed
you will be told that the free is invalid.


Valgrind checks the
address passed to the
free() call and sees
that it has already been
freed.

```
gcc -g -Wall example3.c -o example3.out
```


```
valgrind --leak-check=yes ./example3.out
```


```sh
==148== Memcheck, a memory error detector
==148== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==148== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==148== Command: ./example3.out
==148==
==148== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==148== Invalid free() / delete / delete[] / realloc()
==148==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==148==    by 0x1091C6: main (example3.c:9)
==148==  Address 0x4a4a040 is 0 bytes inside a block of size 40 free'd
==148==    at 0x483CA3F: free (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==148==    by 0x1091BA: main (example3.c:8)
==148==  Block was alloc'd at
==148==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==148==    by 0x10917E: main (example3.c:5)
# highlight-end
==148==
==148==
==148== HEAP SUMMARY:
==148==     in use at exit: 0 bytes in 0 blocks
==148==   total heap usage: 1 allocs, 2 frees, 40 bytes allocated
==148==
==148== All heap blocks were freed -- no leaks are possible
==148==
==148== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==148== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
# highlight-end
```

### 3.3. Caso de uso: Memcheck – Errors Occur Due to Invalid System Call Parameter




Valgrind checks all parameters to system calls.

```c {7} showLineNumbers
#include <stdlib.h>
#include <unistd.h>

int main() {
  int *p;
  p = malloc(10);
  read(0, p, 100); /* Error: unaddressable bytes */
  free(p);
  return 0;
}
```

Here, buf = p contains the address of a 10 byte block. The read system call tries to read 100 bytes from
standard input and place it at p. But the bytes after the first 10 are unaddressable.

read() tries to read 100
bytes from stdin and
place the results in p but
the bytes after the firs 10
are unaddressable.

```
gcc -g -Wall example4.c -o example4.out 
```

```
valgrind --leak-check=yes ./example4.out
```

```sh
==155== Memcheck, a memory error detector
==155== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==155== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==155== Command: ./example4.out
==155==
==155== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==155== Syscall param read(buf) points to unaddressable byte(s)
==155==    at 0x4962FD2: read (read.c:26)
==155==    by 0x1091B8: main (example4.c:7)
==155==  Address 0x4a4a04a is 0 bytes after a block of size 10 alloc'd
==155==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==155==    by 0x10919E: main (example4.c:6)
# highlight-end
==155==

==155==
==155== HEAP SUMMARY:
==155==     in use at exit: 0 bytes in 0 blocks
==155==   total heap usage: 1 allocs, 1 frees, 10 bytes allocated
==155==
==155== All heap blocks were freed -- no leaks are possible
==155==
==155== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==155== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
# highlight-end
```


### 3.4. Caso de uso: Memcheck – Memory Leak Detection


Consider the following program:

```c showLineNumbers
#include <stdlib.h>

int main() {
  int *p, i;
  p = malloc(5*sizeof(int));
  for(i = 0;i < 5;i++)
    p[i] = i;
  return 0;
}
```

In the above program p contains the address of a 20−byte block. But it is not freed anywhere in the program.
So the pointer to this 20 byte block is lost forever. This is known as memory leaking. We can get the leak
summary by using the Valgrind option −−leak−check=yes.

20 unfreed blocks at
routine exit – memory
leak.

```
gcc -g -Wall example5.c -o example5.out 
```

```
valgrind --leak-check=yes ./example5.out
```

```sh
==162== Memcheck, a memory error detector
==162== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==162== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==162== Command: ./example5.out
==162==
==162== error calling PR_SET_PTRACER, vgdb might block
==162==
# highlight-start
==162== HEAP SUMMARY:
==162==     in use at exit: 20 bytes in 1 blocks
==162==   total heap usage: 1 allocs, 0 frees, 20 bytes allocated
==162==
==162== 20 bytes in 1 blocks are definitely lost in loss record 1 of 1
==162==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==162==    by 0x10915E: main (example5.c:5)
# highlight-end
==162==
# highlight-start
==162== LEAK SUMMARY:
==162==    definitely lost: 20 bytes in 1 blocks
==162==    indirectly lost: 0 bytes in 0 blocks
==162==      possibly lost: 0 bytes in 0 blocks
==162==    still reachable: 0 bytes in 0 blocks
==162==         suppressed: 0 bytes in 0 blocks
# highlight-end
==162==
==162== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==162== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
# highlight-end
```

## 4. Ejemplo completo


```c
/* sample.c */
#include <stdio.h>
#include <stdlib.h>
#define SIZE 100

int main() {
  int i, sum = 0;
  int *a = malloc(SIZE);
  for(i=0; i < SIZE; ++i) 
    sum += a[i];
  a[26] = 1;
  a = NULL;
  if(sum > 0) 
    printf("Hi!\n");
  return 0;
}
```

```
gcc -g -Wall sample.c -o sample.out
```

```
valgrind --tool=memcheck --leak-check=yes ./sample.out
```

```sh
==169== Memcheck, a memory error detector
==169== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==169== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==169== Command: ./sample.out
==169==
==169== error calling PR_SET_PTRACER, vgdb might block
# highlight-start
==169== Invalid read of size 4
==169==    at 0x1091A7: main (sample.c:10)
==169==  Address 0x4a4a0a4 is 0 bytes after a block of size 100 alloc'd
==169==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==169==    by 0x109185: main (sample.c:8)
# highlight-end
==169==
# highlight-start
==169== Invalid write of size 4
==169==    at 0x1091BE: main (sample.c:11)
==169==  Address 0x4a4a0a8 is 4 bytes after a block of size 100 alloc'd
==169==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==169==    by 0x109185: main (sample.c:8)
# highlight-end
==169==
# highlight-start
==169== Conditional jump or move depends on uninitialised value(s)
==169==    at 0x1091D0: main (sample.c:13)
# highlight-end
==169==
Hi!
==169==
# highlight-start
==169== HEAP SUMMARY:
==169==     in use at exit: 100 bytes in 1 blocks
==169==   total heap usage: 2 allocs, 1 frees, 612 bytes allocated
==169==
==169== 100 bytes in 1 blocks are definitely lost in loss record 1 of 1
==169==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
==169==    by 0x109185: main (sample.c:8)
# highlight-end
==169==
# highlight-start
==169== LEAK SUMMARY:
==169==    definitely lost: 100 bytes in 1 blocks
==169==    indirectly lost: 0 bytes in 0 blocks
==169==      possibly lost: 0 bytes in 0 blocks
==169==    still reachable: 0 bytes in 0 blocks
==169==         suppressed: 0 bytes in 0 blocks
# highlight-end
==169==
==169== Use --track-origins=yes to see where uninitialised values come from
==169== For lists of detected and suppressed errors, rerun with: -s
# highlight-start
==169== ERROR SUMMARY: 78 errors from 4 contexts (suppressed: 0 from 0)
# highlight-end
```

-----
Ver:
* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab2/herramientas/valgrind
* https://docs.utnso.com.ar/guias/herramientas/valgrind
* **Valgrind HOWTO** [[link]](/pdfs/valgrind/Valgrind-HOWTO.pdf)
* **Manual Rápido de Valgrind CC31A** de José Miguel Piquer y equipo [[link]](/pdfs/valgrind/valgrind.pdf)





## x. Referencias


Material de consulta: https://docs.utnso.com.ar/guias/herramientas/valgrind

* https://github.com/sisoputnfrba/so-commons-library
* https://github.com/sisoputnfrba
* https://github.com/sisoputnfrba/so-commons-library

---

* https://www.u-cursos.cl/ingenieria/2007/2/CC31A/1/material_docente/bajar?id_material=140211
* https://docs.utnso.com.ar/guias/herramientas/valgrind
* https://pages.cs.wisc.edu/~remzi/OSTEP/Educators-Slides/Youjip/Part1.Virtualization/pdf/14.Memory_API.pdf
* https://docs.utnso.com.ar/primeros-pasos/primer-proyecto-c

---

* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab2/herramientas/valgrind
* https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html
* https://pages.cs.wisc.edu/~remzi/Classes/537/Spring2018/
* https://github.com/ossu/computer-science/blob/master/coursepages/ostep/README.md
* https://ocw.unican.es/course/view.php?id=236#section-3
* https://github.com/xxyzz/ostep-hw/tree/master/projects
* https://cse.buffalo.edu/~eblanton/course/cse220/
* https://courses.grainger.illinois.edu/cs423/sp2021/schedule/
* https://www.cs.virginia.edu/~cr4bd/4414/S2020/
* https://pages.cs.wisc.edu/~remzi/OSTEP/Educators-Slides/
* https://ceunican.github.io/aos/

---

* https://github.com/tigarto/memory-api
* https://valgrind.org/docs/manual/manual.html
* https://valgrind.org/docs/manual/valgrind_manual.pdf
* https://web.stanford.edu/class/archive/cs/cs107/cs107.1246/resources/valgrind.html
* https://web.stanford.edu/class/archive/cs/cs107/cs107.1174/guide_valgrind.html
* https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/performance_tuning_guide/s-memory-valgrind
* https://docs.redhat.com/es/documentation/red_hat_developer_toolset/11/html/user_guide/chap-valgrind
* https://man7.org/linux/man-pages/man1/valgrind.1.html
* https://docs.nersc.gov/tools/debug/valgrind/
* https://wiki.tiker.net/ToolCheatSheet/
* https://hps.vi4io.org/teaching/summer_term_2022/pchpc
* https://engineering.purdue.edu/ece264/
* https://engineering.purdue.edu/ece264/24su/schedule
* https://www.cs.dartmouth.edu/~cs50/Lectures/debug/
* https://www.usenix.org/legacy/publications/library/proceedings/usenix05/tech/general/full_papers/seward/seward_html/usenix2005.html
* https://docs.redhat.com/es/documentation/red_hat_enterprise_linux/6/html/performance_tuning_guide/s-memory-valgrind#s-memory-valgrind