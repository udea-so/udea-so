---
sidebar_position: 2
sidebar_label: Procesos
description: Tutorial sobre procesos
---

# Procesos

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Image from '@theme/IdealImage';

## 1. Llamados al sistema

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

### 1.1. Ejemplo de llamado al sistema

Para utilizar los llamados al sistema se puede hacer uso de dos diferentes métodos: la función `syscall` o la función de la librería correspondiente ([guia3_ejemplo1.c](../../../recursos/code/procesos/miselanea_ejemplos/sources/guia3_ejemplo1.c)).

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

### 2.1. Servicios POSIX para la identificación de procesos

To Do... (https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab1/documentacion_basica)

### 2.2. Servicios POSIX para la gestión de procesos

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

### 2.3. Ejemplos de identificacion y gestion de procesos

#### 2.3.1. Creación de procesos

La llamada al sistema `fork` se utiliza para crear un nuevo proceso. Para crear un proceso nuevo, el **proceso padre** hace la llamada `fork` la cual crea una copia de si mismo conocida como **proceso hijo**. Dicha copia posee  toda la información del padre excepto que posee su propio `PID` (Identificador del proceso) y `PPID` (Identificador del proceso padre) como su propio contexto y espacio de memoria. La siguiente figura (tomada de la siguiente [pagina](https://www2.it.uu.se/education/course/homepage/os/ht23/module-2/process-management/)) describe el proceso anterior:


<p align = 'center'>
<figure>
![syscall_fork](/img/labs/tutoriales/procesos/fork-details.png)
<figcaption>**Fig 5**. Resultado de la llamada al sistema `fork`</figcaption>
</figure>
</p>

A continuación se describe con mayor detalle la llamada `fork`:


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

1. Compile y ejecute el siguiente código ([guia3_ejemplo2.c](../../../recursos/code/procesos/miselanea_ejemplos/sources/guia3_ejemplo2.c)):
   
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

#### 2.3.2. Terminación de procesos con `exit`

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
   
   ```c {17} showLineNumbers
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

   Observe bien la figura anterior y notará que una vez invocada la función `exit` el proceso hijo deja de ejecutarse, por eso las instrucciones ubicadas después de esta llamada nunca se ejecutarán.

#### 2.3.3. Llamada `wait` para esperando a que un hijo termine

Si observa la Figura 8 notará algo interesante, el proceso padre culmina antes de que el hijo lo haga. Pues bien, existen ocasiones en las cuales es deseable que el proceso padre espere a que el proceso hijo culmine y es allí donde entra en juego la función `wait`. Básicamente lo que hace esta función es permitir esperar que la ejecución de un proceso hijo finalice y permitir al padre esperar recuperar información sobre la finalización del hijo. A continuación se describe con mas detalle esta función:

:::info[wait]

**Decripción**

Esta función suspende la ejecución del proceso padre hasta que su hijo termine.

**Sintaxis**

```c
#include <sys/types.h>
#include <sys/wait.h>

pid_t wait(int *status);
```

**Parámetros de la función**:
* **`status`**: Puntero a la dirección donde la llamada al sistema debe almacenar el estado de finalización, o valor de retorno del proceso hijo (parámetro utilizado en la llamada `exit`).

**Retorna**:
* Entero que contiene el `PID` del proceso hijo que finalizó
* `-1` si no se crearon hijos o si ya no hay hijos por los cuales esperar.
:::

##### Ejemplos

1. Compile y ejecute el siguiente código:

   ```c {23} showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <sys/wait.h>

   int main(int argc, char *argv[]) {
     pid_t pid_hijo;
     int estado;
     printf("El pid del programa principal es: %d\n",(int)getpid());
     switch(pid_hijo=fork()) {
       case -1: /* Codigo ejecutado en caso de error*/
         printf("Error al crear el proceso");
         return -1;
       case 0: /* Codigo ejecutado por el hijo */
         printf("Hijo: PID del proceso %d\n",(int)pid_hijo);
         printf("Hijo: Mi PID %d\n",(int)getpid());
         printf("Hijo: PID del padre %d\n",(int)getppid());
         exit(0);
         printf("Esto nunca se ejecutará en el proceso hijo\n");
         break;
       default: /* Código ejecutado por el padre */
         wait(&estado);
         printf("Padre: el proceso hijo %d finalizó con el estado %d \n",(int)pid_hijo, estado);
         printf("Padre: Mi PID %d\n",(int)getpid());            
         printf("Padre: PID de mi padre %d\n",(int)getppid());
     }
     return 0;
   }
   ```

   Al ejecutar el código anterior la salida esperada es algo como la siguiente:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/salida_wait.png)
   <figcaption>**Fig 9**. Salida usando `wait` </figcaption>
   </figure>
   </p>
   
   Si se compara la Figura 8 con la 9 podrá notar que ya hay algo diferente y es que una vez invocada la función `wait`, el proceso padre no continua la ejecución de las instrucciones siguientes hasta que el proceso hijo culmine su ejecución.
   
   Ahora bien, si hay varios procesos hijos, el proceso padre queda bloqueado hasta que uno de ellos culmina. Al finalizar uno de ellos, se liberan todos los recursos que tengan asociados, recuperándose el valor de retorno devuelto para que pueda ser accesible desde el proceso que realizó la llamada. El siguiente código clarifica un poco esto.

2. Compile y ejecute el siguiente código:
   
   ```c {42,44,46} showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <wait.h>

   int main(int argc, char *argv[]) {
     pid_t pid_h1, pid_h2, pid_h3;
     int status_h1, status_h2, status_h3;
     pid_t pid_n;
     int status_n;
     int i = 0;  
     pid_h1 = fork();
     if(pid_h1 == 0) {
       i++;
       pid_n = fork();
       if( pid_n == 0 ) {
         i++;
         printf("NIETO: i = %d\n",i);      
       }
       else {
         wait(&status_n); // Papa (hijo 1) esperando hijo (nieto)
         i++;
         printf("HIJO 1: finalizo nieto %u con estado %d\n", pid_n, status_n );      
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
           // El papa decidió esperar todos los hijos al final
           wait(&status_h1); // Papa esperando un hijo
           printf("PAPA: ha finalizado un hijo con estado %d\n", status_h1);
           wait(&status_h2); // Papa esperando otro hijo
           printf("PAPA: ha finalizado otro hijo con estado %d\n", status_h2);
           wait(&status_h3); // Papa esperando el ultimo hijo
           printf("PAPA: ha finalizado el ultimo hijo con estado %d\n", status_h3);
           i++;
           printf("PAPA: i = %d\n",i);   
         }
       }
     }
     return 0;
   }
   ```

   Como se puede ver en el código anterior, hay una invocación a `wait` por cada uno de los hijos esperados.
  
   **Preguntas**

   1. ¿Qué diferencias nota entre los dos códigos (anteriormente mostrados) que usan el llamado `wait`?
   2. ¿Cuál es la salida de estos ejemplos y por qué?

#### 2.3.4. Terminación de procesos con `kill`

Es posible terminar abruptamente con la vida de un proceso, para ello se emplea la llamada `kill`, la cual a diferencia de la función `exit` termina de manera forzada dicho proceso. 

`kill` también es un comando en consola, el cual se emplea pasando como argumento el `PID` del proceso que se desea culminar. Este comando trabaja enviando una señal de terminación (`SIGTERM`) la cual causa que el proceso culmine a menos que el programa tenga un handler para gestionar esta señal o que `SIGTERM` (la señal) se encuentra enmascarada. En lo que respecta a la función la siguiente tabla resume sus mayores atributos:


:::info[kill]

**Decripción**

Envía una señal a un proceso o a un grupo de procesos. Un proceso puede enviar señales a otro proceso que tenga el mismo ID real o efecto o siempre y cuando tenga los permisos para hacerlo. Un programa puede hacer un llamada `kill` a sí mismo.

**Sintaxis**

```c
#include <sys/types.h>
#include <signal.h>
int kill(pid_t pid, int sig);
```

**Parámetros de la función**:
* **`status`**: Puntero a la dirección donde la llamada al sistema debe almacenar el estado de finalización, o valor de retorno del proceso hijo (parámetro utilizado en la llamada `exit`).

* **`pid`**: Especifica el proceso al cual se le quiere enviar la señal.
  * Si `pid > 0`, se enviará una señal al proceso cuyo `ID` sea igual a `pid`.
  * Si `pid = 0`, se enviará una señal a todos los procesos cuyos `ID` de grupo sea igual al del proceso que envía la señal (excepto de los que no posee permisos para hacerlo).
  * Si `pid < -1`, se envía la señal a todos los procesos cuyo `ID` de grupo sea igual al valor absoluto de `pid`.
* **`sig`**: Especifica la señal que debe ser enviada al proceso. Las lista de señales se puede consultar en la siguiente enlace, en la sección signals.

**Retorna**:
* `0` si el proceso tiene permiso para enviar la señal.
* `-1` si el envío de la señal falla
:::

##### Ejemplos

1. Compile y ejecute el siguiente código:

   ```c showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <signal.h>

   int main(int argc, char *argv[]) {
     printf("ID del proceso: %d\n", (int)getpid());
     printf("ID del padre de este proceso: %d\n", (int)getppid());
     for(;;) {
       pause();
     }
     return 0;
   }
   ```

   Luego compile el código y ejecútelo en **background** (esto para que no se bloquee la consola hasta que el programa termine y pueda ejecutar otros comandos), a continuación se muestra como:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/ejecucion_background.png)
   <figcaption>**Fig 10**. Ejecución en background de `a.out` </figcaption>
   </figure>
   </p>
   
   Si se invoca el comando `ps`, se puede ver la información más relevante de los procesos que actualmente se están ejecutando tal y como se muestra la siguiente figura:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/comando_ps.png)
   <figcaption>**Fig 11**. Salida en consola del comando `ps` </figcaption>
   </figure>
   </p>

   Como se puede notar de la figura anterior, se despliegan 3 procesos la consola (`bash`), el proceso del comando `ps` y el proceso del programa que acaba de ser compilado y que ahora se ejecuta (`a.out`). Como el programa tiene un ciclo infinito vamos a enviarle una señal de terminación con el comando `kill` tal y como se muestra a continuación:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/cmd_kill.png)
   <figcaption>**Fig 12**. Terminación del proceso asociado al ejecutable `a.out` usando el comando `kill` </figcaption>
   </figure>
   </p>

   Como se puede notar en la figura anterior, el programa es culminado (si vuelve a ejecutar el comando `ps` notará que ya no aparece este proceso). Note una cosa importante, el comando `kill` se invocó pasando el `pid` del proceso a matar (`32067`) y el *número de la señal* a enviar (`9`). Una forma alternativa de invocar este comando sería: `kill -KILL 32067`, donde `KILL` es una constante del sistema que es igual al mismo número `9`.

   Anteriormente se vio el uso de `kill` como comando, ahora veamos cómo es su empleo como función dentro de un archivo de código.

2. Compile y ejecute el siguiente código fuente:
   
   ```c {17} showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <signal.h>
   #include <sys/types.h>

   int main(int argc, char *argv[]) {
     pid_t my_pid;
     my_pid = getpid();
     printf("Mi ID del proceso es: %d \n",(int)my_pid);
     printf("El ID del padre del proceso es: %d \n",(int)getppid());
     printf("Hola mundo. \n");
     printf("Hola mundo. \n");
     printf("Hola mundo. \n");
     printf("Hola mundo. \n");
     printf("Hasta la vista baby. \n");
     kill(my_pid,9); //Forma alternativa:kill(pid_hijo,SIGKILL); 
     printf("Hasta la vista baby. \n");
     printf("Hasta la vista baby. \n");
     printf("Hasta la vista baby. \n");
     return 0;
   }
   ```

#### 2.3.5. Procesos Zombies y Procesos Huérfanos

El sistema operativo Linux define dos tipos de procesos que se pueden dar dentro de este sistema operativo: el proceso con estado zombie o el proceso huérfano.

El **proceso zombie** se presenta cuando se requiere que las estructuras de datos del sistema operativo asociadas a un proceso continúen existiendo a pesar de que el proceso haya finalizado. Un **proceso huérfano** se refiere a un proceso que, debido a la terminación de su proceso padre, requiere ser reasignado a la jerarquía de procesos del sistema operativo.

Después de que un proceso hijo es creado por su padre haciendo uso de la función `fork` pueden suceder una de las siguientes cosas:
* Que el proceso padre espere a que el proceso hijo culmine haciendo uso de la función `wait`. En el caso normal, cuando el proceso hijo termina, se le notifica su terminación al padre y se le manda el valor a la variable `status`. Ahora bien, también podría suceder que el proceso padre se queda a la espera de que el hijo acabe y que éste, en efecto, ya ha culminado. Más exactamente, que *el proceso hijo finalice antes de que el proceso padre llame la función* `wait`. Cuando esto sucede, si las estructuras de datos del proceso hijo son liberadas, el proceso padre no podría recoger el estado de salida de su hijo. Para evitar este caso el sistema operativo utiliza el estado **zombie** para mantener estos datos disponibles sin importar que el proceso ya haya finalizado. 
* Que el proceso padre no espere a que su hijo culmine, de tal manera que si *el proceso padre culmina primero* el proceso hijo será un **proceso huérfano**. El sistema operativo realiza un proceso de reparentalización (*reparenting*), en el cual un nuevo proceso padre **adopta** el proceso hijo (generalmente lo hace el proceso `init` o el proceso de sesión `upstart`).
  
##### Ejemplos

1. Compile y ejecute el siguiente código el cual crea un proceso zombie. Elija como nombre del ejecutable `make-zombie`:
   
   ```c showLineNumbers
   #include <stdlib.h>
   #include <sys/types.h>
   #include <unistd.h>
   
   int main () {
     pid_t child_pid;
     /* Creacion del proceso hijo. */
     child_pid = fork ();
     if (child_pid > 0) {
       /*Este es el proceso padre el cual duerme por 20 segundos.*/
       sleep (20);
     }
     else {
       /* Este es el proceso hijo el cual culmina inmediatamente.*/
       exit (0);
     }
     return 0;
   }
   ```
   
   Ejecute el programa anterior y una vez hecho esto, ejecuta en otra pestaña el comando `ps –o pid,ppid,stat,cmd`. Notará una salida algo similar como la de la siguiente figura:

   <p align = 'center'>
   <figure>
   ![salida_exit](/img/labs/tutoriales/procesos/ps_command2.png)
   <figcaption>**Fig 13**. Salida en pantalla del comando `ps –o pid,ppid,stat,cmd` </figcaption>
   </figure>
   </p>

   De la figura anterior se puede observar la salida del proceso `make-zombie` la existencia de otro proceso (el hijo zombie: `[make-zombie] <defunct>`) cuyo código de estado es `Z` indicando que es zombie.

   **Ejercicio**: En el código del ejercicio anterior, intercambie las instrucciones que ejecuta el padre y el hijo. Es decir, haga que el padre finalice inmediatamente ejecutando la instrucción `exit` y que el hijo espere durante 20 segundos ejecutando la instrucción `sleep`. ¿Qué nota ahora de diferente? ¿Cuál es el valor del campo ppid para el proceso hijo? 


### 2.4. Ejecución de nuevos programas

#### 2.4.1. Familia de funciones `exec`

Con anterioridad se trató la función `fork` la cual permitía la creación de un nuevo proceso el cual era una copia del proceso padre, la limitante al respecto era que al ser el nuevo proceso una copia del padre, lo que en realidad se estaba ejecutando era otra instancia de un mismo programa, esto impone una limitante la cual se traduce en la siguiente pregunta: ¿Es posible realizar la ejecución de nuevos programas?

Pues bien, afortunadamente existe una nueva función con la cual esta limitante puede ser superada, la función `exec`. Esta función reemplaza el programa que se está ejecutando en un proceso por otro programa. Cuando un programa llama una función `exec`, el proceso inmediatamente cesa de ejecutar el programa y empieza ejecutando un nuevo programa desde el principio (asumiendo que la llamada `exec` no encontró un error). 

<p align = 'center'>
<figure>
![salida_exec](/img/labs/tutoriales/procesos/exec.png)
<figcaption>**Fig 14**. Resultado de la llamada `exec` </figcaption>
</figure>
</p>


Dentro de la familia de funciones `exec`, hay funciones que varían levemente en sus capacidades y como son invocadas, la siguiente tabla trata esto con más detalle:

:::info[exec]

**Decripción**

Esta familia de funciones, reemplaza la imagen de memoria actual del proceso con una nueva imagen de memoria. 

**Sintaxis**

```c
#include <unistd.h>

int execl(const char *path, const char *arg,...);
int execlp(const char *path, const char *arg,...);
int execle(const char *path, const char *arg,...,char *const envp[]);
int execv(const char *path, char *const argv[]);
int execvp(const char *file, char *const argv[]);
```

**Parámetros de la función**:
* **`path` o `file`**: Cadena de caracteres que contiene el nombre del nuevo programa a ejecutar con su ubicación, `/bin/cp` por ejemplo.
* **`arg`**: Lista de uno o más apuntadores a cadenas de caracteres que representan la lista de argumentos que recibirá el programa llamado. Por convención, el primer argumento deberá contener el nombre del archivo que contiene el programa ejecutado. El último elemento de la lista debe ser un apuntador a `NULL`.
* **`arg[]`**: Array de punteros a cadenas de caracteres que representan la lista de argumentos que recibirá el programa llamado. Por convención, el primer argumento (`arg0`) deberá tener el nombre del archivo que contiene el programa ejecutado y el último elemento deberá ser un apuntador a `NULL`.
* **`envp[]`**: Array de apuntadores a cadenas que contienen el entorno de ejecución (variables de entorno) que tendrá accesible el nuevo proceso. El último elemento deberá ser un apuntador a `NULL`.

**Retorna**:
* En caso de que la llamada a la función sea correcta esta no retorna nada (pues no regresa al programa que lo llamo).
* Si hay una falla el valor retornado será `-1`.
:::

##### Ejemplos

1. Compile y ejecute el siguiente código:
   
   ```c showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   
   int main(int argc, char *argv[]) {
	   printf("Ejecutable: \n");
	   char *args[] = {"/bin/ls", "-l", ".", NULL};
	   printf("Forma 1: \n");
	   execl("/bin/ls", "/bin/ls", "-l", ".", NULL);
     printf("Forma 2: \n");
	   execv("/bin/ls", args);
     printf("Forma 3: \n");
	   execvp("/bin/ls", args);
	   return 0;
   }
   ```
   
   **Preguntas**

   1. ¿Qué hace el programa anterior?
   2. ¿Qué tiene de raro la salida?
   3. Tome el código anterior y dividalo en 3 programas donde cada uno de estos debe colocar cada una de las diferentes invocaciones de la funciones de la familia `exec`; esto es, el código **programa 1** debe usar `execl`, el **programa 2** `execv` y el **programa 3** `execvp`.

#### 2.4.2. Usando `fork` y `exec`

Al ejecutar el programa código anterior se puede notar que solo se ejecuta el primer llamado al exec (`execl`), los otros dos llamados (`execv` y `execvp`) nunca se ejecutan, porque una vez culmina la ejecución del primer `exec` el proceso invocador es sobreescrito por el nuevo programa invocado.


Recuerde que, cuando analizamos la función `fork` encontramos que se podían crear copias de procesos y que esas copias en realidad siempre ejecutaban el mismo programa.

Así, según lo anterior tenemos una limitante, por un lado podemos crear copias pero estas ejecutan siempre lo mismo, y por otro lado podemos ejecutar un programa nuevo con llamado a una de las funciones de la familia `exec`, pero una vez hecho esto solo se puede ejecutar un solo programa. Pues bien, es posible solucionar estas limitantes mediante el uso combinado de las funciones `fork` y `exec` tal y como se muestra en la siguiente figura:

<p align = 'center'>
<figure>
![salida_exec](/img/labs/tutoriales/procesos/fork_exec.png)
<figcaption>**Fig 15**. Uso combinado de las funciones `fork` y `exec` </figcaption>
</figure>
</p>


El efecto de usar estas dos funciones combinadas es que *permiten que un programa pueda correr subprogramas*. Como se muestra en la figura anterior, para correr un subprograma (nuevo programa invocado) dentro de un programa, lo primero que tiene que hacer el proceso padre es invocar la función `fork` para crear un nuevo proceso hijo (el cual es una copia del padre), y luego ese proceso hijo invoca la función `exec` para empezar el nuevo programa. Lo anterior permite que el programa que realiza la invocación, continúe en ejecución en el lado de ejecución del proceso padre mientras que el programa llamado es reemplazado por el subprograma en el proceso hijo. 

El siguiente fragmento de código muestra el esqueleto de cómo se hace uso de estas llamadas en conjunto:

```c 
// ...
// highlight-start  
if (fork == 0) {
    // Este es el hijo    
    execvp(path, args); // Llamado a exec para ejecutar subprograma
    // highlight-end
}
else
{
    // Este es el padre
    // Llamado a wait para esperar a que el hijo termine
    // (opcional: depende de la situación)
    // highlight-start  
    wait(&status); 
    // highlight-end
}
```

El efecto del fragmento de código anterior se puede comprender mas facilmente al visualizar la siguiente figura (tomada del siguiente [link](https://www2.it.uu.se/education/course/homepage/os/ht23/module-2/))

<p align = 'center'>
<figure>
![salida_exec](/img/labs/tutoriales/procesos/fork-exec-exit-wait.png)
<figcaption>**Fig 16**. Uso combinado de las funciones `fork` y `exec` </figcaption>
</figure>
</p>

##### Ejemplos

1. Realizar un programa que invoque los comandos `date` y `ls` (`ls` debe listar el contenido del directorio raíz (`/`)). El padre debe imprimir una vez que los dos subprocesos han culminado la frase `"Hasta la vista baby"`. A continuación se muestra el código asociado al ejemplo anterior:
   
   ```c {10,13,16,19,23,24} showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <wait.h>

   int main(int argc, char *argv[]) {
     pid_t pid_h1, pid_h2;
     int status1, status2;
     pid_h1 = fork();
     if(pid_h1 == 0) {
       // Proceso hijo el cual ejecuta el comando ls
       execl("/bin/ls","/bin/ls","/",NULL);
     }
     else {
       pid_h2 = fork();
       if(pid_h2 == 0) {     
         // Proceso hijo que ejecuta el comando date
         execl("/bin/date","/bin/date",NULL);
       }
       else {
         // Proceso padre
         wait(&status1); // wait para esperar un proceso
         wait(&status2); // wait para esperar el otro proceso
         printf("Hasta la vista baby\n");
       }
     }
     return 0;
   }
   ```



:::note

Con la combinación de llamados `fork` y `exec` no solo es posible invocar comandos, también se pueden invocar ejecutables hechos por nosotros. Por ejemplo, supóngase que usted compilo un programa el cual imprimía la frase hola mundo, al realizar esto, usted generó el ejecutable con nombre `myExe.out` el cual se encuentra en el directorio de trabajo actual, ahora bien, usted desea invocar este ejecutable desde otro programa con la función `exec`, el siguiente fragmento de código muestra cómo se desarrolla esta tarea:

```c
// ...
if (fork == 0) {
    // Este es el hijo
    execl("./myExe.out", "./myExe.out", NULL); // Ejecutar subprograma
}
else
{
    // Este es el padre
    // Llamado a wait para esperar a que el hijo termine
    // (opcional: depende de la situacion)
    wait(&status); 
}
...
```
:::

##### Ejercicio

1. Realizar un programa que ejecute un comando que no existe y luego ejecute el comando `ls -l`.

## 3. Ejemplos

### 3.1. s 

sss

## x. Taller

1. Escriba en consola `man syscalls` y responda: ¿Qué contiene esta llamada al sistema?

2. Compile y ejecute el siguiente programa:
   
   ```c showLineNumbers
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <unistd.h>

   int main(void) {
	   int fd;
	   pid_t pid;
	   int num;
	   if ((pid = fork()) < 0) {
		   perror("fork falló");
		   exit(-1);
	   } 
     else if (pid == 0) {
		   for (num=0; num<20; num++) {
			   printf("hijo: %d\n", num);
         sleep(1);
		   }
	   } 
     else {
		   for (num=0; num<20; num+=3) {
			  printf("padre: %d\n", num);
        sleep(1);
		   }
	   }
   }
   ```
   
   **Preguntas**:
   1. ¿Qué significa el retorno de la función `fork`?
   2. ¿Cuál es la salida esperada en pantalla?
   3. ¿Cómo es posible que la sentencia `printf` reporte valores diferentes para la variable num en el hijo y en el padre?

3. Dado el siguiente código:
   
   ```c showLineNumbers
   #include<stdio.h>
   #include<unistd.h>
   
   main() {
     printf("Hola ");
     fork();
     printf("Mundo");
     fork();
     printf("!");
   }
   ```

   **Preguntas**
   1. Sin ejecutarlo dibuje la jerarquía de procesos del programa y determine cuál es la posible salida en pantalla.
   2. Compile y ejecute el programa. ¿Es la salida en consola la que usted esperaba? ¿Cuál puede ser la razón de esto? (**ayuda**: función `fflush`: `fflush(stdout)`;)
   3. Modifique el programa de tal manera que se creen exactamente 3 procesos, el padre imprime `Hola`, el hijo imprime `Mundo` y el hijo del hijo imprime `!`, exactamente en ese orden.

4. Dado el siguiente código:
   
   ```c showLineNumbers
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   #include <sys/types.h>
   #include <sys/wait.h>
   
   main() {
     pid_t  pid;
     int status;
     printf("PADRE: Mi PID es %d\n", getpid());
     printf("PADRE: El PID de mi padre es %d\n", getppid());
     pid = fork();
     if(pid == 0) {
       sleep(5);
       printf("HIJO: Mi PID es %d\n", getpid());
       printf("HIJO: El PID de mi padre es %d\n", getppid());
       printf("HIJO: Fin!!\n");
     }
     else {
       printf("PADRE: Mi PID es %d\n", getpid());
       printf("PADRE: El PID de mi hijo es %d\n", pid);
       // wait(&status);
       // printf("PADRE: Mi hijo ha finalizado con estado %d\n", status);
       printf("PADRE: Fin!!\n");
     }
     exit(0);
   }
   ```
   
   **Preguntas**
   1. ¿Cuál es la principal función de sleep en el código anterior?
   2. ¿Quién es el padre del padre? Use este comando:
    	
      ```
      ps -alf
      ```
   3. ¿Por qué el proceso hijo imprime el id del padre como `1`? ¿Es el que usted espera de acuerdo la jerarquía de procesos?
   4. Retire el comentario de las líneas de la función wait y la siguiente función `printf`. ¿Cuál es el identificador del padre ahora? ¿Para qué sirve la función wait? ¿Qué retorna en status? 

5. **Proceso zombie**: Dado el siguiente código:
   
   ```c showLineNumbers
   #include <sys/types.h>
   #include <unistd.h>
   #include <stdio.h>
   #include <stdlib.h>
   
   int main() {
     pid_t pid;
     char *message;
     int n;
     printf("Llamado a fork\n");
     pid = fork();
     switch(pid) {
       case -1:
         perror("fork falló");
         exit(1);
       case 0:
         message = "Este es el hijo";
         n = 1;
         break;
       default:
         message = "Este es el padre";
         n = 30;
         break;
     }
     for(; n > 0; n--) {
       printf("n=%d ",n);
       puts(message);
      sleep(1);
     }
     exit(0);
   }
   ```
   
   Cuando un proceso hijo termina, su asociación con el padre continúa mientras el padre termina normalmente o realiza el llamado a `wait`. La entrada del proceso hijo en la tabla de procesos no es liberada inmediatamente. Aunque el proceso no está activo el proceso hijo reside aún en el sistema porque es necesario que su valor de salida exista en caso de que el proceso padre llame `wait`. Por lo tanto él se convierte en un proceso zombie.
   * Realice el comando  `ps –ux`  en otra terminal mientras el proceso hijo haya finalizado pero antes de que el padre lo haga. ¿Qué observa en las líneas de los procesos involucrados?
   * ¿Qué sucede si el proceso padre termina de manera anormal?

6. **Familia de funciones execl: `execl`, `execlp`, `execle`, `exect`, `execv` y `execvp` y todas las que realizan una función similar empezando otro programa**. El nuevo programa empezado, sobrescribirá el programa existente, de manera que nunca se podrá retornar al código original a menos que la llamada `execl` falle.
   
   * **Programa 1**:

     ```c showLineNumbers
     #include <unistd.h>
     #include <stdio.h>
     #include <sys/types.h>
     #include <sys/wait.h>
     
     void main() {
       int pid;
       if ((pid = fork()) == 0) {
  		   execl("/bin/ls", "ls", "/", 0);
       }
       else {
         wait(&pid);
         printf("exec finalizado\n");
       }
     }
     ```

   * **Programa 2**:
     
     ```c showLineNumbers
     #include <unistd.h>
     #include <stdio.h>
     #include <stdlib.h>
     
     int main() {
       printf("Corriendo ps con execlp\n");
       execlp("ps", "ps", "-ax", 0);
       printf("Echo.\n");
       exit(0);
     }
     ```
     
     **Preguntas**
     1. ¿Qué es lo que hace cada uno de los programas anteriormente mostrados?

7. **Jerarquia de procesos**. Haga un programa que cree 5 procesos donde el primer proceso es el padre del segundo y el tercero, y el tercer proceso a su vez es padre del cuarto y el quinto:
    
   <p align = 'center'>
   <figure>
   ![jerarquia_proc_ejercicio7](/img/labs/tutoriales/procesos/jerarquia_proc.png)
   <figcaption>**Fig 17**. Jerarquia de procesos </figcaption>
   </figure>
   </p>

   El programa debe tener la capacidad de:
   * Verificar que la creación de proceso con `fork` haya sido satisfactoria.
   * Imprimir para cada proceso su `id` y el `id` del padre.
   * Imprimir el `id` del proceso padre del proceso 1.
   * A través de la función `system` imprimir el árbol del proceso y verificar la jerarquía (`pstree`).

8.  Codifique un programa que haga lo siguiente:
    * Cree 3 procesos diferentes. 
    * Cada uno de los procesos hijos, calculará por recursión el factorial de los enteros entre 1 y 10, imprimirá los resultados en pantalla y terminará.
    * El mensaje impreso por cada proceso debe ser lo suficientemente claro de modo que sea posible entender cuál es el proceso hijo que está ejecutando la operación factorial.
    * El proceso padre tiene que esperar a que los hijos terminen.
  
    Una salida tentativa se muestra a continuación (esto no quiere decir que el orden en que se despliegue sea el mismo):

    ```
    HIJO1: fact(1) = 1
    HIJO2: fact(2) = 1
    HIJO2: fact(2) = 2
    HIJO1: fact(2) = 2
    ...
    ``` 

9. Realice un programa llamado `ejecutador` que lea de la entrada estándar el nombre de un programa y cree un proceso hijo para ejecutar dicho programa.
10. Dado el siguiente fragmento de código:
    
    ```c showLineNumbers
    #include<stdio.h>
    #include<error.h>
    #include<stdlib.h>
    #include<fcntl.h>
    
    int main(int argc, char *argv[]) {
      int fd;
      int pid;
      char ch1, ch2;
      fd = open("data.txt", O_RDWR);
      read(fd, &ch1, 1);
      printf("En el padre: ch1 = %c\n", ch1);
      if ((pid = fork()) < 0) {
        perror("fork fallo");
        exit(-1); //Sale con código de error
      } 
      else if (pid == 0) {
        read(fd, &ch2, 1);
        printf("En el hijo: ch2 = %c\n", ch2);
      } 
      else {
        read(fd, &ch1, 1);
        printf("En el padre: ch1 = %c\n", ch1);
      }
      return 0;
    }
    ```
    
    * Cree manualmente el archivo `data.txt` con el siguiente contenido:
  
      ```
      hola
      ```
 
    * Ejecute el programa, capture en pantalla la salida producida. ¿Por qué el programa produce la salida vista? ¿Qué sucede con un padre que abre un archivo, lo hereda?

## y. Referencias




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

---------------------------------------------------------------------------------------

* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab1
* https://github.com/dannymrock/UdeA-SO-Lab/tree/master/lab1/ejemplo_basico
* https://docs.google.com/document/d/1KqR3MCNYvuMZB0ohgpWFg6qHJiFlTiysyOZCxa5Fh4o/edit
* https://github.com/repos-SO-UdeA/lab7/tree/master/ejemplos_guia3
  




