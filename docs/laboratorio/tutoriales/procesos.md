---
sidebar_position: 2
sidebar_label: Procesos
description: Tutorial sobre procesos
---

# Procesos

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

# 1. Llamados al sistema

Los procesos de usuario se ejecutan en el modo menos privilegiado de la máquina (modo usuario) donde sólo pueden ejecutar algunas operaciones básicas. Muchas de las operaciones privilegiadas relacionadas principalmente con los servicios del sistema operativo tienen que ser solicitadas al kernel mediante los **llamados al sistema**.

<p align = 'center'>
<figure>
![syscall_commic](https://wizardzines.com/images/uploads/syscalls.png)
<figcaption>**Fig 1**. Commic llamados al sistema (Figura tomada del siguiente [link](https://wizardzines.com/comics/syscalls/))</figcaption>
</figure>
</p>

Los llamados al sistema son la interfaz por la cual los procesos acceden a las funciones del Sistema Operativo. Los llamados al sistema se encuentran implementados en el kernel y se ejecutan en **modo privilegiado**. En la escritura de programas, un llamado al sistema *se invoca como una función*, sin embargo, a diferencia de una función ordinaria, cuando un programa llama a una función del sistema, los argumentos son empaquetados y manejados por el kernel, el cual toma el control de la ejecución hasta que el llamado se completa.

Un llamado al sistema no es una llamado a una función ordinaria, y requiere un procedimiento especial para transferir el control al kernel. Básicamente el compilador genera una instrucción especial de máquina que, al ejecutarse, produce una interrupción de software ("trap" o excepción sincronica) para que se realice un cambio de modo en el procesador (de "usuario" a "privilegiado") y el kernel del sistema operativo realice las acciones restringidas necesarias para prestar el servicio solicitado.

<p align = 'center'>
<figure>
![syscall](https://www2.it.uu.se/education/course/homepage/os/ht23/images/module-1/system-call.png)
<figcaption>**Fig 2**. Llamados al sistema (Comic realizado por Julia Evans tomada del siguiente [link](https://www2.it.uu.se/education/course/homepage/os/ht23/module-1/definitions/))</figcaption>
</figure>
</p>

En el caso de los sistemas Unix/Linux, los llamados al sistema se encuentran inmersos en funciones pertenecientes a diferentes librerías. Por ejemplo, la función `time`, de la librería `time.h`, contiene el llamado para consultar el reloj del sistema; y la función `close`, de la librería `unistd.h`, contiene el llamado para cerrar un archivo.

<p align = 'center'>
<figure>
![syscall](/img/labs/tutoriales/procesos/syscall_interface.png)
<figcaption>**Fig 3**. Proceso de una llamada al sistema</figcaption>
</figure>
</p>

En el documento **LINUX System Call Quick Reference** ([enlace](https://wiki.deimos.fr/images/3/3c/LINUX_System_Call_Quick_Reference.pdf)) se encuentra una tabla de referencias con los principales llamados al sistema del sistema operativo Linux, esta tabla es de gran utilidad para el desarrollo de todas las prácticas siguientes, así que se recomienda su estudio.

## 1.1. Ejemplo de llamado al sistema

Para utilizar los llamados al sistema se puede hacer uso de dos diferentes métodos: la función `syscall` o la función de la librería correspondiente.

```c {12,19} showLineNumbers
#include <syscall.h>
#include <unistd.h>
#include <stdio.h>
#include <sys/types.h>

int main(void) {
  long ID1, ID2;
  /*--------------------------------*/
  /* DIRECT SYSTEM CALL             */
  /* SYS_getpid(func no. is 20)     */
  /*--------------------------------*/
  ID1 = syscall(SYS_getpid);
  printf("syscall(SYS_getpid) = %ld\n", ID1);

  /*-----------------------------------*/
  /* "libc" WRAPPED SYSTEM CALL        */
  /* SYS_getpid(func no. is 20)        */
  /*-----------------------------------*/
  ID2 = getpid();
  printf("getpid() = %ld\n", ID2);
  return 0;
}
```

El código anterior muestra un ejemplo de la invocación del llamado del sistema `getpid`. En el primer caso se empleó el llamado indirecta con la función `syscall` (`man syscall` ([link](https://man7.org/linux/man-pages/man2/syscall.2.html))) (Línea 12), mientras que en el segundo caso se hizo el llamado al sistema con la función de la librería estándar `getpid` (`man getpid` ([link](https://man7.org/linux/man-pages/man2/getpid.2.html))) (Línea 19). 

**Preguntas**
1. Consulte el documento **LINUX System Call Quick Reference** y verifique el numero de la función `getpid`
2. ¿Cuales serian los numeros asociados a las llamadas `open`, `close`, `write`, `read` y `time`?

## 2. Procesos

Un proceso se puede definir como una instancia en ejecución de un programa, igualmente, concebimos un proceso como el mecanismo del sistema operativo que abstrae el uso del recurso de procesamiento. En general los procesos son componentes fundamentales de un sistema operativo, por ende es necesario conocer las herramientas que el sistema operativo nos ofrece para gestionar su funcionamiento.

<p align = 'center'>
<figure>
![syscall](/img/labs/tutoriales/procesos/tablas_so.png)
<figcaption>**Fig 3**. Estructura general de las tablas de un sistema operativo</figcaption>
</figure>
</p>

El sistema operativo lleva el control de los procesos a través de la **tabla de procesos**, donde se almacena una estructura de datos llamada el **bloque control de procesos** (**PCB** , por sus siglas en inglés: **Process Control Block**). En el PCB se encuentra información relevante del proceso como su *identificador*, su *proceso padre*, su *estado*, el valor del registro *program counter* (`PC`), el valor del registro *stack pointer* (`SP`), las *referencias a su imagen de memoria*, y, en general, todo aquello que se debe conocer del proceso para que pueda iniciarse nuevamente desde el punto donde este se detuvo para ceder la CPU a otro proceso (ver Figura 4).


<p align = 'center'>
<figure>
![syscall](/img/labs/tutoriales/procesos/pcb.png)
<figcaption>**Fig 4**. PCB (Process Control Block)</figcaption>
</figure>
</p>

La siguiente tabla muestra algunos de los campos de una entrada PCB:
  
|Process management|Memory management|File management|
|---|---|---|
|Registers <br/> Program counter <br/> Program status word <br/> Stack pointer <br/> Process state <br/> Pr ior ity <br/> Scheduling parameters <br/> Process ID <br/> Parent process <br/> Process group <br/> Signals <br/> Time when process started <br/> CPU time used <br/> Children’s CPU time <br/> Time of next alarm|Memory management <br/> Pointer to text segment info <br/> Pointer to data segment info <br/> Pointer to stack segment info|Root directory <br/> Working directory <br/> File descriptors <br/> User ID <br/> Group ID|

En los sistemas operativos la parte relacionada con los procesos se definen como mediante estructuras de datos y funciones que permiten al sistema operativo virtualizar el uso de la CPU. Por ejemplo en el [xv6](https://en.wikipedia.org/wiki/Xv6), la parte asociada se define en los archivos [`proc.h`](https://github.com/mit-pdos/xv6-public/blob/master/proc.h) y [`proc.c`](https://github.com/mit-pdos/xv6-public/blob/master/proc.c)


### 2.1. Servicios POSIX para la gestión de procesos


A continuación se realizará una revisión de los principales servicios que ofrece la especificación **POSIX** (Portable Operating System Interface for UNIX) para la administración de procesos.

#### 2.2.1. Identificación de procesos

Cada proceso se identifica por medio de un número único con representación entera. Este es conocido como el identificador del proceso (que es de tipo `pid_t`). La siguiente tabla muestra las principales funciones empleadas para este fin:

|Función|Descripción|
|---|---|
|`pid_t getpid(void)`| Este servicio devuelve el identificador del proceso que realiza la llamada.|
|`pid_t getppid(void)`|Devuelve el identificador del proceso padre|
|`uid_t getuid(void)`|Devuelve el identificador del usuario real (usuario que ejecuta el proceso).|
|`uid_t geteuid(void)`|Devuelve el identificador del usuario efectivo (usuario en el que se ejecuta el proceso).|
|`gid_t getgid(void)`|Devuelve el identificador del grupo real.|
|`gid_t getegid(void)`|Devuelve el identificador del grupo efectivo.|


#### 2.2.2. Gestión de procesos

Este grupo de funciones permite la creación y manipulación del estado de los procesos. La siguiente tabla describe brevemente estas funciones:

|Función|Descripción|
|---|---|
|`pid_t fork(void)`|Permite crear procesos: Se realiza una clonación del proceso que lo solicita (conocido como proceso padre). El nuevo proceso se conoce como proceso hijo.|
|`int execl(char *path, char *arg,...)`|Familia de funciones que permiten cambiar el programa que está ejecutando el proceso.|
|`void exit (int status)`|Termina la ejecución de un proceso y envía el valor de `status` al padre. Es similar a `return` de la función `main`.|
|`pid_t wait (int *status)` <br/> `pid_t waitpid(pid_t pid, int *status, int options)`|Permite que un proceso padre espere hasta que finalice la ejecución de un proceso hijo. El proceso padre se queda bloqueado hasta que termina el proceso hijo. Ambas llamadas permiten obtener información sobre el estado de terminación.|
|`int sleep (unsigned int seconds)`|Suspende el proceso durante un número de segundos. El proceso despierta cuando ha transcurrido el tiempo o cuando el proceso recibe una señal.|

### 2.2. Ejemplos de identificacion y gestion de procesos

#### 2.2.1. Creación de procesos

La llamada al sistema `fork` se utiliza para crear un nuevo proceso. Para crear un proceso nuevo, el **proceso padre** hace la llamada `fork` la cual crea una copia de si mismo conocida como **proceso hijo**. Dicha copia posee  toda la información del padre excepto que posee su propio `PID` (Identificador del proceso) y `PPID` (Identificador del proceso padre) como su propio contexto y espacio de memoria. La siguiente figura (tomada de la siguiente [pagina](https://www2.it.uu.se/education/course/homepage/os/ht23/module-2/process-management/)) describe el proceso anterior:


<p align = 'center'>
<figure>
![syscall_fork](/img/labs/tutoriales/procesos/fork-details.png)
<figcaption>**Fig 5**. ``Resultado de la llamada al sistema `fork`</figcaption>
</figure>
</p>

A continuación se describe con mayor detalle la llamada ``fork`:


:::info[fork]

**Sintaxis**

```c
#include <unistd.h>

pid_t fork(void);
```

**Decripción**

La función `fork()` crea un nuevo **proceso hijo** como duplicado del proceso que la invoca (**proceso padre**). Cuando la ejecución de la función es exitosa se retorna un valor diferente para el padre y para el hijo:
* Al padre se le retorna el `PID` del hijo.
* Al hijo se le retorna `0`.

El valor retornado será `-1` en caso de que la llamada falle y no se pueda crear un proceso hijo.

La siguiente figura resume el resultado:

<p align = 'center'>
<figure>
![syscall](/img/labs/tutoriales/procesos/fork_syscall.png)
<figcaption>**Fig 6**. `fork` syscall </figcaption>
</figure>
</p>
:::

##### Ejemplos

1. Compile y ejecute el siguiente código:
   
   ```c {8} showLineNumbers
   #include <unistd.h>
   #include <stdio.h>

   int main(int argc, char *argv[]) {
     pid_t valor_retornado;
     printf("Ejemplo de fork. Este proceso va a crear otro proceso\n");
     printf("El PID del programa principal es: %d\n", (int)getpid());
     switch(valor_retornado = fork()) {
       case -1: // Caso de error
         printf("Error al crear el proceso");
         return -1;
       case 0: // Codigo ejecutado por el hijo
         printf("PROCESO HIJO:\n");
         printf("Mi PID es:%d\n", (int)valor_retornado);
         break;
       default: // Codigo ejecutado por el padre
         printf("PROCESO PADRE:\n");
         printf("El PID de mi hijo es:%d\n", (int)valor_retornado);
     }
     // Código ejecutado tanto por el padre como el hijo
     printf("Finalizando el programa...:\n");
     return 0;
   }
   ```

   **Preguntas**

   1. ¿Cuál es la salida del programa anterior y por qué?

2. **Múltiples hijos**. Un proceso puede crear o tener múltiples hijos **llamando repetidamente** la función `fork`. Y estos hijos pueden tener o crear otros procesos (nietos). La recomendación es tener un proceso padre que cree a todos los hijos que se necesiten. A continuación. se muestran algunas formas de trabajar con varios procesos:
   
   * **Múltiples llamados a `fork` mediante condicionales**
     
     ```c {9,15,21} showLineNumbers 
     #include <stdio.h>
     #include <stdlib.h>
     #include <unistd.h>
     
     int main () {
       pid_t pid_hijo1; 
       pid_t pid_hijo2; 
       pid_t pid_hijo3;
       pid_hijo1 = fork(); // Creo el primer hijo
       if(pid_hijo1 == 0) { // Hijo 1
         printf("Soy el hijo 1\n");
         sleep (5);
       } 
       else {  // Padre
         pid_hijo2 = fork(); // Creo al segundo hijo
         if(pid_hijo2 == 0) { // Hijo 2
           printf("Soy el hijo 2\n");
           sleep (5);
         } 
         else {  // Padre
           pid_hijo3 = fork();  // Creo al tercer hijo
           if(pid_hijo3 == 0) { // Hijo 3
             printf("Soy el hijo 3\n");
             sleep (5);
           } 
           else {  // Padre
             printf("Soy el padre\n");
             sleep (5);
           }
         }
       }
       return 0;
     }     
     ```
     
     **Preguntas**

     1. ¿Cuál es la salida del programa anterior y por qué?

   * **Múltiples llamados a `fork` mediante ciclos**    
  
     ```c {10} showLineNumbers 
     #include <stdio.h>
     #include <stdlib.h>
     #include <unistd.h>

     int main () {
       int i;
       int numHijos = 3;
       pid_t pid;
       for(i = 0; i < numHijos; i++) {
         pid = fork();
         if(pid == -1) {
           /* Error */
           printf("No fue posible crear un hijo\n");
           return -1;
         }
         if (pid == 0) {
           printf("Soy el hijo #%d con PID: %d\n",i+1, getpid());
           exit(0);
         }
       }
       return 0;
     }
     ```
   
     **Preguntas**:
   
     1. ¿Cuál es la salida del programa anterior y por qué?
     2. ¿Como almacenar el `pid` de cada uno de los procesos anteriormente creados sin que se pierda el valor (debido a la sobreescritura de esta variable en el código anterior)?
  
   * **Múltiples llamados a `fork` mediante ciclos (forma poco usada)**   
  
     ```c {10} showLineNumbers 
     #include <stdio.h>
     #include <stdlib.h>
     #include <unistd.h>

     int main () {
       int pid;
       int numHijos = 5;
       int numProceso;
       for(numProceso = 0; numProceso < numHijos; numProceso++) {
         pid = fork();
         if(pid == -1) {
           // Imprimir algún mensaje de error
         } 
         else if(pid == 0) {
           break;
         }
       }
       if (pid == 0) {
         // Lógica del hijo
         printf("Soy el hijo #%d\n", numProceso);
       }
       else {
         printf("Soy un padre perezoso\n");
       }
     }
     ```

3. **Familia de procesos**. En la siguiente jerarquía de procesos, cada uno de los procesos hijos debe aumentar el valor de una variable e imprimir ese valor en pantalla:
   
   <p align = 'center'>
   <figure>
   ![jerarquia_procesos](/img/labs/tutoriales/procesos/jerarquia_de_procesos.png)
   <figcaption>**Fig 7**. Jerarquia de procesos </figcaption>
   </figure>
   </p>

   Note que en la figura anterior el **proceso padre** (`0`) creó 3 **procesos hijos** (`1`, `3`, `4`) y **un proceso "nieto"** (`2`). A continuación se muestra el código asociado el problema anterior.

   ```c {8,11,21,27} showLineNumbers 
   #include <unistd.h>
   #include <stdio.h>

   int main(int argc, char *argv[]) {
     pid_t pid_h1, pid_h2, pid_h3;
     pid_t pid_n;
     int i = 0;  
     pid_h1 = fork();
     if(pid_h1 == 0) {
       i++;
       pid_n = fork();
       if(pid_n==0) {
         i++;
         printf("NIETO: i = %d\n",i);      
       }
       else {
         printf("HIJO 1: i = %d\n",i);      
       }   
     } 
     else {
       pid_h2 = fork();
       if(pid_h2 == 0) {
         i++;
         printf("HIJO 2: i = %d\n",i);   
       }
       else {
         pid_h3 = fork();
         if(pid_h3 == 0) { 
           i++;
           printf("HIJO 3: i = %d\n",i);   
         }
         else {  
           printf("PAPA: i = %d\n",i);   
         }
       }
     }
     return 0;
   }
   ```
   
   **Preguntas**:
   
   1. ¿Cuál es la salida del código anterior y por qué?

:::warning
No se preocupe si aún no comprende las salidas de los códigos anterior. Revise el material que se muestra a continuación y vuelva nuevamente a los ejemplos anteriormente mostrados para entender la causa de los resultados arrojados.
:::

#### 2.2.2. Terminación de procesos con `exit`

Así cómo es posible crear procesos también es posible finalizarlos mediante las llamadas a sistema `exit` y `kill`. A continuación vamos a centrarnos en la primera.



:::info[exit]

**Sintaxis**

```c
#include <unistd.h>

void exit(int status);
```

**Decripción**

Esta función causa la terminación normal de un proceso. La variable entera `status` es empleada para transmitir al proceso padre la forma en que el proceso hijo ha terminado. Por convención este valor suele ser `0` si el programa termina de manera exitosa u otro valor cuando la terminación de este es anormal.
:::

##### Ejemplos

1. Compile y ejecute el siguiente código y analice el efecto de usar la función `exit`:
   
   ```c showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>

   int main(int argc, char *argv[]) {
     pid_t pid_hijo;
     printf("El pid del programa principal es: %d\n",(int)getpid());

     switch(pid_hijo=fork()) {
       case -1: /* Código ejecutado en caso de error*/
         printf("Error al crear el proceso");
         return -1;
       case 0: /* Código ejecutado por el hijo */
         printf("Hijo: Valor de retorno fork: %d\n",(int)pid_hijo);
         printf("Hijo: Mi PID: %d\n",(int)getpid());
         printf("Hijo: PID del padre: %d\n",(int)getppid());
         exit(0);
         printf("Esta instrucción nunca se ejecutara en el proceso hijo\n");
         break;
       default: /* Código ejecutado por el padre */
         printf("Padre: PID del proceso hijo: %d\n",(int)pid_hijo);
         printf("Padre: Mi PID: %d\n",(int)getpid());
         printf("Padre: PID de mi padre: %d\n",(int)getppid());
     }
     return 0;
   }
   ```

   Al ejecutar el código anterior, se espera que salga algo similar a la captura mostrada en la siguiente figura:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/salida_exit.png)
   <figcaption>**Fig 8**. Uso del `exit` </figcaption>
   </figure>
   </p>



   







 









https://www2.it.uu.se/education/course/homepage/os/ht20/images/module-1/system-call.png
https://wizardzines.com/comics/syscalls/

From: https://wizardzines.com/comics/syscalls/
https://www2.it.uu.se/education/course/homepage/os/ht20/images/module-1/higher-grade/so.png


## x. Referencias

* https://www.digikey.com/es/maker/blogs/2024/unveiling-the-power-of-assembly-level-language
* https://blog.adafruit.com/2021/09/20/modifying-the-linux-kernel-adding-new-syscalls-linux/
* https://linux-kernel-labs.github.io/refs/heads/master/lectures/syscalls.html
* https://wizardzines.com/comics/syscalls/
* https://github.com/lsophiagr/os-system-call
* https://manybutfinite.com/post/system-calls/
* https://www2.it.uu.se/education/course/homepage/os/ht23/
* https://os-book.com/
* https://www2.it.uu.se/education/course/homepage/os/ht20/
* https://www2.it.uu.se/education/course/homepage/os/ht20/module-2/exec/
* https://www2.it.uu.se/education/course/homepage/os/ht20/module-2/process-management/
* https://learn-anything.xyz/operating-systems
* https://learn.sparkfun.com/tutorials/raspberry-gpio/all
* https://www.linuxjournal.com/article/1145
* https://www.linuxjournal.com/article/3326
* https://opensource.com/article/19/10/strace
* https://www.linux.it/~rubini/docs/ksys/
* https://lwn.net/Articles/604287/
* https://sail.cs.queensu.ca/data/pdfs/EMSE2017_AnalyzingADecadeOfLinuxSystemCalls.pdf
* https://developer.ibm.com/technologies/linux/
* https://blog.guillaume-gomez.fr/Linux-kernel/1/1
* https://github.com/0xAX/linux-insides/blob/master/SysCall/linux-syscall-1.md
* https://sysdig.com/blog/fascinating-world-linux-system-calls/
* https://www.omscs-notes.com/operating-systems/processes-and-process-management/

* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab1
* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab1/ejemplo_basico
* https://docs.google.com/document/d/1KqR3MCNYvuMZB0ohgpWFg6qHJiFlTiysyOZCxa5Fh4o/edit
* https://github.com/repos-SO-UdeA/lab7/tree/master/ejemplos_guia3
  




