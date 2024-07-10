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

Tal y como se mencionó con anterioridad, mediante la herramienta **`Memcheck`** de **`valgrind`** es posible encontrar e identificar errores de memoria. Algunos de los tipos de memoria que se pueden identificar mediante el uso de esta herramienta son:
* Uso de memoria no inicializada.
* Lectura o escritura de memoria liberada con `free`
* Lectura o escritura fuera del area reservada con `malloc`
* Lectura o escritura inapropiada de la pila
* Memory leaks (fugas de memoria), cuando se pierden los punteros a un área de memoria pedida con `malloc`
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

Este error se da cuando:
* Las variables locales intentan ser leidas sin haber sido inicializadas.
* Se intenta acceder a bloques de memoria asignados con ``malloc` sin estos haber sido previamente inicializados.

Cuando la reserva se hace usando `calloc` no se presenta este problema ya que los bloques de memoria reservados son inilizalizado con `0`.

#### Ejemplos

1. Mediante el uso del `Valgrind` realice el analisis de memoria para el código (example1.c) mostrado a continuación:

   ```c {5} showLineNumbers
   #include <stdlib.h>

   int main() { 
     int p, t;
     if (p == 5) /*Error occurs here*/
       t = p + 1;
     return 0;
   }
   ```
   
   Para la compilación del archivo fuente se usa el `gcc` con la bandera `-g` activada:

   ```
   gcc -Wall -g example1.c -o example1.out
   ```
   
   El comando `valgrind` ejecutado para este caso se muestra a continuación:

   ```
   valgrind --leak-check=yes ./example1.out
   ```
   
   :::info
    Note que en el comando anterior no fue necesario usar la opción ```--tool=memcheck``` por que esta es la herramienta por defecto que usa `valgrind`. En todo caso, el comando equivalente se muestra a continuación:

    ```
    valgrind --tool=memcheck --leak-check=yes ./example1.out
    ```
   :::

   La salida resultante es la siguiente.

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
   
   Como se resalta en la salida anterior, se hace enfasis que en la linea `5` del archivo `example1.c` el condicional depende de una variable no inicializada lo cual hace que el comportamiento del programa no se pueda predecir generando un error de lógica. Si se desea conocer el origen de las variables no inicializadas se puede activar la opción `--track-origins` tal y como se muestra en el siguiente comando.

   ```
   valgrind --leak-check=yes --track-origins=yes ./example1.out
   ```

   Como se puede observar en la salida, en la parte asociada al **Backtrace** (resaltada a continuación) se muestra el origen del problema esta en la linea 3 del archivo `example1.c`, que es donde se hizo la declaración de la variable `p` sin inicializarla de modo que su valor es desconocido.

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

### 3.2. Caso de uso: Memcheck – Illegal read/write

Un error de acceso ilegal a memoria **`Illegal read/write error`** ocurre cuando se intenta leer o escribir en una dirección de memoria a la que no tiene acceso autorizado (dirección que no se encuentra en el rango de direcciones validas del programa). A continuación se detallan algunas situaciones que causan este tipo de error:
1. **Acceso a Memoria Liberada**: Leer o escribir en memoria después de haberla liberado.
   
   ```c
   int *ptr = malloc(sizeof(int));
   free(ptr);
   *ptr = 42; // Illegal write
   ```

2. **Acceso Fuera de los Límites de un Arreglo**: Indices del arreglo fuera de rango.
   
   ```c
   int arr[10];
   arr[10] = 5; // Illegal write, índice fuera del rango
   ```

3. **Acceso a Punteros No Inicializados**: Utilizar punteros que no han sido inicializados.
   
   ```c
   int *ptr;
   *ptr = 42; // Illegal write
   ```

4. **Desbordamiento de Pila**: Usar más memoria de pila de la que está disponible.
   
   ```c
   void func() {
     int arr[1000000]; // Puede causar un desbordamiento de pila
   }
   ```

#### Ejemplos

1. Haga un analisis de memoria para el siguiente código (example2.c) usando `valgrind`:
   
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

   Para compilar el programa tenemos el siguiente comando:

   ```
   gcc -g -Wall example2.c -o example2.out
   ```
   
   El comando `valgrind` empleando la herramienta `Memcheck` se muestra a continuación:

   ```
   valgrind --tool=memcheck --leak-check=yes ./example2.out
   ```
   
   La salida resultante se muestra a continuación:

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

   Como se muestra en la parte resaltada anteriormente, en el código anterior se esta intentando escribir en un area de memoria invalida (dirección `p+sizeof(int)*11`) pues solo se reservo memoria para 10 datos tipo `int`, no para 11.

### 3.3. Caso de uso: Memcheck – Invalid free

Un error tipo **`Invalid free`** se da tipicamente en escenarios como los que se describen a continuación:
1. **Doble liberación de memoria**: Intentar liberar la misma porción de memoria más de una vez.
   
   ```c
   int* ptr = (int*)malloc(sizeof(int));
   free(ptr);
   free(ptr);  // Error: doble liberación
   ```

2. **Liberar memoria no asignada dinámicamente**: Intentar liberar un puntero que no apunta a memoria dinamicamente asignada.
   
   ```c
   int a;
   int* ptr = &a;
   free(ptr);  // Error: no se puede liberar memoria estática o automática
   ```

#### Ejemplos

1. Usando `valgrind` analice el código (example3.c) que se muestra a continuación:

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

   El comando de compilación se muestra a continuación:

   ```
   gcc -g -Wall example3.c -o example3.out
   ```
   
   El comando `valgring` empleado es el siguiente:

   ```
   valgrind --leak-check=yes ./example3.out
   ```

   Finalmente, los resultados del ejecutar el `valgrind` tienen la siguiente forma:

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
   
   Como se resalta en la salida anterior, al realizar un doble `free` se libero un espacio de memoria que ya no existia (debido a la primera llamada `free` realizada).

### 3.4. Caso de uso: Memcheck – Invalid System Call Parameter

En `Valgrind` el error `Invalid System Call Parameter` indica que el programa esta pasando argumentos incorrectos a una llamada se sistema.

#### Ejemplos

1. Analice el siguiente códido (example4.c) con `valgrind`:
   
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

   El comando empleado para compilar se muestra a continuación:

   ```
   gcc -g -Wall example4.c -o example4.out 
   ```
   
   El comando `valgrind` empleado es el siguiente:

   ```
   valgrind --leak-check=yes ./example4.out
   ```
   
   De la salida resultante a continuación, se puede apreciar la llamada al sistema esta intentando leer desde la entrada estandar `100 bytes` y colocarlos en el buffer `p` cuyo tamaño es de `10 bytes` lo cual genera un error pues solo los primeros `10 bytes` son accesibles. 
    
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

Recordemos que un **memory leak** (fuga de memoria) se da cuando un programa no libera la memoria (dinamicamente reservada) que ya no necesita. Existen varias clases de fugas, las principales son:
* **definitely lost**: En este caso, los bloques de memoria asignados se pierden definitivamente debido a que el apuntador relacionado con estos se pierde (al apuntar a otra parte por ejemplo) de tal manera que no es posible acceder nuevamente a la dirección asociada a dichos bloques.
  
  ```c
  int *b = (int *)malloc(10*sizeof(int));
  b = (int *)NULL; // Se pierde el puntero
  ```

* **possibly lost**: Este caso se da cuando el `valgrind` no tiene la certeza sobre la perdida de un bloque debido a que aun hay apuntadores que todavia lo referencian. Por ejemplo hacer cosas como mover un apuntador a la mitad del bloque referencia por este en el heap puede hacer que se de este problema.
  
  ```c
  int *a = (int *)malloc(1024*sizeof(int));
  *a = 1; 
  ```

Cuando se esta realizando analisis de fugas de memoria, la recomendación es usar la opción `--leak-check=full` pues dara información del tipo de perdida que se tiene.

#### Ejemplo

1. Considere el siguiente programa (example5.c):

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
   
   Para compilar el programa tenemos:

   ```
   gcc -g -Wall example5.c -o example5.out 
   ```
   
   El comando `valgrind` aplicado se muestra a continuación:

   ```
   valgrind --leak-check=full ./example5.out
   ```
   
   Para este caso, la salida arrojada se muestra a continuación:

   ```sh
   ==144== Memcheck, a memory error detector
   ==144== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
   ==144== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
   ==144== Command: ./example5.out
   ==144==
   ==144== error calling PR_SET_PTRACER, vgdb might block
   ==144==
   # highlight-start
   ==144== HEAP SUMMARY:
   ==144==     in use at exit: 20 bytes in 1 blocks
   ==144==   total heap usage: 1 allocs, 0 frees, 20 bytes allocated
   ==144==
   ==144== 20 bytes in 1 blocks are definitely lost in loss record 1 of 1
   ==144==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
   ==144==    by 0x10915E: main (example5.c:5)
   # highlight-end
   ==144==
   # highlight-start
   ==144== LEAK SUMMARY:
   ==144==    definitely lost: 20 bytes in 1 blocks
   ==144==    indirectly lost: 0 bytes in 0 blocks
   ==144==      possibly lost: 0 bytes in 0 blocks
   ==144==    still reachable: 0 bytes in 0 blocks
   ==144==         suppressed: 0 bytes in 0 blocks
   # highlight-end
   ==144==
   ==144== For lists of detected and suppressed errors, rerun with: -s
   # highlight-start
   ==144== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
   # highlight-end
   ```

   En el programa anterior, `p` contiene la dirección de un bloque de `20 bytes` pero este no es liberado en ninguna parte del programa. De manera que el puntero a este bloque de `20 bytes` se pierde por siempre.


## 4. Miselanea de ejemplos

1. Dado el siguiente programa (sample.c):
   
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

   El comando empleado para compilar se muestra a continuación: 

   ```
   gcc -g -Wall sample.c -o sample.out
   ```
   
   El comando de `valgrind` se muestra a continuación:

   ```
   valgrind --tool=memcheck --leak-check=full ./sample.out
   ```

   La salida resultante tiene la siguiente forma:

   ```sh
   ==152== Memcheck, a memory error detector
   ==152== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
   ==152== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
   ==152== Command: ./sample.out
   ==152==
   ==152== error calling PR_SET_PTRACER, vgdb might block
   # highlight-start
   ==152== Invalid read of size 4
   ==152==    at 0x1091A7: main (sample.c:10)
   ==152==  Address 0x4a4a0a4 is 0 bytes after a block of size 100 alloc'd
   ==152==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
   ==152==    by 0x109185: main (sample.c:8)
   # highlight-end
   ==152==
   # highlight-start
   ==152== Invalid write of size 4
   ==152==    at 0x1091BE: main (sample.c:11)
   ==152==  Address 0x4a4a0a8 is 4 bytes after a block of size 100 alloc'd
   ==152==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
   ==152==    by 0x109185: main (sample.c:8)
   # highlight-end
   ==152==
   # highlight-start
   ==152== Conditional jump or move depends on uninitialised value(s)
   ==152==    at 0x1091D0: main (sample.c:13)
   # highlight-end
   ==152==
   Hi!
   ==152==
   # highlight-start
   ==152== HEAP SUMMARY:
   ==152==     in use at exit: 100 bytes in 1 blocks
   ==152==   total heap usage: 2 allocs, 1 frees, 612 bytes allocated
   ==152==
   ==152== 100 bytes in 1 blocks are definitely lost in loss record 1 of 1
   ==152==    at 0x483B7F3: malloc (in /usr/lib/x86_64-linux-gnu/valgrind/vgpreload_memcheck-amd64-linux.so)
   ==152==    by 0x109185: main (sample.c:8)
   # highlight-end
   ==152==
   # highlight-start
   ==152== LEAK SUMMARY:
   ==152==    definitely lost: 100 bytes in 1 blocks
   ==152==    indirectly lost: 0 bytes in 0 blocks
   ==152==      possibly lost: 0 bytes in 0 blocks
   ==152==    still reachable: 0 bytes in 0 blocks
   ==152==         suppressed: 0 bytes in 0 blocks
   # highlight-end
   ==152==
   ==152== Use --track-origins=yes to see where uninitialised values come from
   ==152== For lists of detected and suppressed errors, rerun with: -s
   # highlight-start
   ==152== ERROR SUMMARY: 78 errors from 4 contexts (suppressed: 0 from 0)
   # highlight-end
   ```
   
   **Preguntas**:
   1. ¿Cuantos errores son detectados?
   2. ¿Que tipo de errores se muestran?

## 5. Referencias

* https://github.com/sisoputnfrba/so-commons-library
* https://github.com/sisoputnfrba
* https://github.com/sisoputnfrba/so-commons-library
* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab2/herramientas/valgrind
* https://docs.utnso.com.ar/guias/herramientas/valgrind
* https://www.u-cursos.cl/ingenieria/2007/2/CC31A/1/material_docente/bajar?id_material=140211
* https://docs.utnso.com.ar/guias/herramientas/valgrind
* https://pages.cs.wisc.edu/~remzi/OSTEP/Educators-Slides/Youjip/Part1.Virtualization/pdf/14.Memory_API.pdf
* https://docs.utnso.com.ar/primeros-pasos/primer-proyecto-c
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
* https://ranger.uta.edu/~alex/courses/3318/