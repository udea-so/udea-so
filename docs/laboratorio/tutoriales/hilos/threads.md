---
sidebar_position: 1
sidebar_label: threads
description: Tutorial sobre hilos
---

import Image from '@theme/IdealImage';

# Threads (hilos)


:::tip[Objetivos]
* Explorar el uso de hilos como herramienta básica para aprovechar la concurrencia en los procesos. 
* Conocer y usar las principales herramientas para la gestión de hilos en la librería pthread.
:::

## 1. Motivación

:::note[Sobre los hilos]
"What happened to the prejudice of two years ago, which was that the parallel programming is difficult? It turns out that what was difficult, and almost impossible, is to take an ordinary program and automatically figure out how to use the parallel computation effectively on that program. Instead, one must start all over again with the problem, appreciating that we have the possibility of parallel calculation, and rewrite the program completely with a new [understanding of] what is inside the machine. It is not possible to effectively use the old programs. They must be rewritten. That is a great disadvantage to most industrial applications and has met with considerable resistance. But the big programs usually belong to scientists or other, unofficial, intelligent programmers who love computer science and are willing to start all over again and rewrite the program if they can make it more efficient. So what’s going to happen is that the hard programs, vast big ones, will be the first to be re-programmed by experts in the new way, and then gradually everybody will have to come around, and more and more programs will be programmed that way, and programmers will just have to learn how to do it".

<p align = 'center'>
<figure>
![portada](/img/labs/tutoriales/hilos/The_pleasure_of_finding_things_out.jpg)
<figcaption>**Fig 1**. The pleasure of finding things out</figcaption>
</figure>
</p>


Capítulo 2 del libro **The pleasure of finding things out**
:::


## 2. Hilos (threads)

Los hilos son el medio por el cual un proceso puede implementar concurrencia. Éstos permiten que un proceso posea varios caminos de ejecución y, a su vez, compartan cierta región de memoria de manera directa. Por otro lado, en un sistema con KLT (Kernel Level Thread) y con multiprocesamiento o multithreading (por ejemplo, el hyperthreading de Intel), los hilos aprovechan al máximo los recursos de hardware disponibles y aumentan considerablemente el desempeño de una aplicación. 

Cada sistema operativo tiene, generalmente, una forma diferente de implementar los hilos a bajo nivel, sin embargo cuando estamos interactuando con un Lenguaje de Alto Nivel (LAN), éstos poseen o usan librerías que permiten abstraer aún más el problema. Cómo este curso está basado en herramientas libres y el sistema Linux, nosotros en la presente guía de laboratorio trabajaremos la implementación de hilos a través del lenguaje de programación C, la librería **`pthread`** y bajo el sistema operativo Linux.

## 3. Trabajando con la libreria pthread

Para crear aplicaciones multihilo el linux, se emplea la libreria `pthread` (POSIX threads). Esta biblioteca permite la creación y gestión de hilos de ejecución (threads), los cuales pueden ejecutarse de manera concurrente dentro un proceso. 

Para que un programa pueda usar la interfaz de programación para hilos, lo promero que se debe realizar es incluisr la libreria `pthread` en el código:

```c
#include <pthread.h>
```

Luego, despues de codificar el programa, se procede a compilar el programa enlazando la biblioteca  `pthread` mediante la opción `–lpthread` en el comando ejecutado con el `gcc`:

```
gcc codigo.c –o ejecutable -lpthread 
```

En las siguientes secciones, nos centraremos en las diferentes funciones del API `pthread` empleadas para codificar programas multihilo.

### 3.1. Creación de un hilo

Para la creación de un hilo se emplea la función **`pthread_create`** cuya descripción se muestra a continuación:

:::info[pthread_create]

**Sintaxis**

`pthread_create` crea y ejecuta un nuevo hilo. Esta rutina puede ser llamada cualquier número de veces desde cualquier parte del codigo.

```c
int pthread_create(
                    pthread_t * thread,                /* in - out */
                    const pthread_attr_t * attr,       /* in */
                    void *(* start_routine )(void *),  /* in */
                    void * arg                         /* in */ 
                   );
```

**Parámetros de la función**:
* **`thread`**: Es un apuntador (por ende debe ser previamente inicializado) en el cual se almacena el ID del thread recién creado.
* **`attr`**: Apuntador usado para asignar atributos al hilo. Si se asigna `NULL`, los atributos con los que se inicializará el hilo serán los atributos por defecto.
* **`start_routine`**: Es la rutina (función) que el hilo ejecutará una vez que es creado. `void*` y aceptar un argumento de tipo `void*`.
* **`arg`**: Argumento que se pasa a la `start_routine`. Este deberá ser pasado por referencia haciendo un casting a un apuntador tipo `void`. Sí se emplea `NULL` significa que ningún argumento será pasado.

**Retorna**:
* **`0`**: Si la creación del hilo exitosa.
* **`Número positivo`**: En caso de error.

:::

Respecto al caso de los procesos existe una similitud (obviamente sin olvidar los detalles y aspectos conceptuales de fondo) entre las funciones **`pthread_create`** y **`fork`** tal y como se muestra en el siguiente gráfico (tomado de la pagina **POSIX Threads API** ([link](https://www.cs.fsu.edu/~baker/realtime/restricted/notes/pthreads.html))):

<!--
<Image img={require('/img/labs/tutoriales/hilos/threads_tut_fig1.png')} />
-->

<p align = 'center'>
<figure>
![comparacion](/img/labs/tutoriales/hilos/forkjoin.gif)
<figcaption>**Fig 2**. Similitudes proceso e hilo</figcaption>
</figure>
</p>

A continuación se muestra un código ejemplo.

#### Ejemplo 1

El siguiente código ([lab4_p1_example1.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example1.c)) emplea la función `pthread_create` para mostrar la creación de hilos.

``` c {26} showLineNumbers
/***********************************************************************
* Code listing from "Advanced Linux Programming," by CodeSourcery LLC  *
* Copyright (C) 2001 by New Riders Publishing                          *
* See COPYRIGHT for license information.                               *
***********************************************************************/

#include <pthread.h>
#include <stdio.h>

/* Prints x's to stderr.  The parameter is unused.  Does not return.  */

void* print_xs (void* unused)
{
  while (1) 
    fputc ('x', stderr);
  return NULL;
}

/* The main program.  */

int main ()
{
  pthread_t thread_id;
  /* Create a new thread.  The new thread will run the print_xs
     function.  */
  pthread_create (&thread_id, NULL, &print_xs, NULL);
  /* Print o's continuously to stderr.  */
  while (1) 
    fputc ('o', stderr);
  return 0;
}
```

:::info
Para finalizar la ejecución del programa emplee la combinación de teclas `<Ctrl + C>`.
:::

**Preguntas**
1. ¿Cuáles son y para qué sirven los argumentos de la función pthread_create? ¿Cómo funcionan estos para este ejemplo en especial? 
2. ¿Cómo es la salida en pantalla? ¿Cuál es la razón para este tipo de salida?

### 3.2. Varios Hilos y modo de ejecución

Tal y como en secciones previas del curso, al igual que en los procesos es posible crear varios hilos pues la función `pthread_create` puede ser llamada tantas veces como se desee dentro del código (en el cual se encuentra el hilo principal). La siguiente gráfica aclara esto: 

<p align = 'center'>
<figure>
![nojoin](/img/labs/tutoriales/hilos/nojoin.gif)
<figcaption>**Fig 3**. Creación de varios hilos ([link](https://www.cs.fsu.edu/~baker/realtime/restricted/notes/pthreads.html))</figcaption>
</figure>
</p>

El siguiente ejemplo ilustra esta situación.

#### Ejemplo 2

En el siguiente ejemplo ([lab4_p1_example2.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example2.c)) se crean dos hilos a partir de un hilo principal.

```c {12-18,23-32,46,51} showLineNumbers
/***********************************************************************
* Code listing from "Advanced Linux Programming," by CodeSourcery LLC  *
* Copyright (C) 2001 by New Riders Publishing                          *
* See COPYRIGHT for license information.                               *
***********************************************************************/

#include <pthread.h>
#include <stdio.h>

/* Parameters to print_function.  */

struct char_print_parms
{
  /* The character to print.  */
  char character;
  /* The number of times to print it.  */
  int count;
};

/* Prints a number of characters to stderr, as given by PARAMETERS,
   which is a pointer to a struct char_print_parms.  */

void* char_print (void* parameters)
{
  /* Cast the cookie pointer to the right type.  */
  struct char_print_parms* p = (struct char_print_parms*) parameters;
  int i;

  for (i = 0; i < p->count; ++i)
    fputc (p->character, stderr);
  return NULL;
}

/* The main program.  */

int main ()
{
  pthread_t thread1_id;
  pthread_t thread2_id;
  struct char_print_parms thread1_args;
  struct char_print_parms thread2_args;

  /* Create a new thread to print 30000 x's.  */
  thread1_args.character = 'x';
  thread1_args.count = 30000;
  pthread_create (&thread1_id, NULL, &char_print, &thread1_args);

  /* Create a new thread to print 20000 o's.  */
  thread2_args.character = 'o';
  thread2_args.count = 20000;
  pthread_create (&thread2_id, NULL, &char_print, &thread2_args);
  
  /*-------INSERTAR AQUÍ-------*/

  return 0;
}
```

**Preguntas**
1. ¿Cuál es el resultado de la ejecución? ¿Usted esperaba este resultado? ¿Por qué?
2. ¿Para qué se usa un apuntador a un tipo de dato void? ¿Qué sentido tiene hacer esto?


### 3.3. Conectando hilos (Join)

Recordemos que la función `pthread_create` permitia que un hilo (el cual llamaremos padre) creara y ejecutara otro hilo (el cual llamaremos hijo).

Tal y como se mostro en la sección anterior, una vez creados los hilos cada uno empieza a ejecutarse de manera independiente. Sin embargo a veces puede ser util que el hilo padre, antes de proseguir su ejecución, espere a que el hilo hijo termine hijo (pues depronto puede necesitar resultados del hilo hijo). Para hacer que el hilo padre espere al hilo hijo, se emplea la función `pthread_join` (de manera bastante similar al caso de la función `waitpid` para usada para los procesos). La siguiente figura ilustra esto:

<p align = 'center'>
<figure>
![nojoin](/img/labs/tutoriales/hilos/join.gif)
<figcaption>**Fig 3**. Conectando hilos ([link](https://www.cs.fsu.edu/~baker/realtime/restricted/notes/pthreads.html))</figcaption>
</figure>
</p>

A continuación se describe la función `pthread_join`

:::info[pthread_join]

**Sintaxis**

La función `pthread_join` es usada para poner al hilo que la invoca (hilo padre) a esperar hasta que el hilo hijo se termine su ejecución.

```c
include <pthread.h>

int pthread_join(
                 pthread_t thread ,            /* in */
                 void ** retval                /* in - out */
                );
```

**Parámetros de la función**:
* **`thread`**: Objeto tipo `pthread_t` asociado con el hilo hijo.
* **`retval`**: Parámetro a una variable usada para almacenar el valor de retorno del hilo. Este se usa comúnmente para almacenar el valor retornado por la función llamada en el `pthread_create` o puede ser puesto en `NULL` si no se necesita capturar el valor de retorno.

**Retorna**:
* **`0`**: Si la creación del hilo exitosa.
* **`Número positivo`**: En caso de error.
:::

#### Ejemplo 3 

En el siguiente ejemplo ([lab4_p1_example3.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example3.c)) se ilustra el uso de la función `pthread_join`.  Dado el siguiente código:

```c 
...
thread2_args.character = 'o';
thread2_args.count = 20000;
pthread_create (&thread2_id, NULL, &char_print, &thread2_args);
// highlight-start  
/*-------INSERTAR AQUÍ-------*/
// highlight-end
```

Modifiquelo justo después de la linea resaltada insertando las siguientes líneas:  

```c 
pthread_join (thread1_id, NULL);
pthread_join (thread2_id, NULL);
```

**Preguntas**

1. ¿Qué sucede ahora con la ejecución de este código? ¿Por qué?
2. ¿Cuál es la funcionalidad de hacer un join en los hilos?
3. ¿Cuáles son los parámetros de la función pthread_join? ¿Cuál es su uso?

### 3.4. PID e hilos

Recordemos que todo proceso se caracteriza por tener un PID asociado, pero ¿Qué pasa cuando se crea un hilo?, ¿será que el PID del hilo hijo cambia en relación con el del padre? En la siguiente sección, el objetivo es que usted descubra esto por cuenta propia al analizar el siguiente código fuente:

#### Ejemplo 4

PID e hilos ([lab4_p1_example4.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example4.c))

```c showLineNumbers
/***********************************************************************
* Code listing from "Advanced Linux Programming," by CodeSourcery LLC  *
* Copyright (C) 2001 by New Riders Publishing                          *
* See COPYRIGHT for license information.                               *
***********************************************************************/

#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

void* thread_function (void* arg)
{
  fprintf (stderr, "child thread pid is %d\n", (int) getpid ());
  /* Spin forever.  */
  while (1);
  return NULL;
}

int main ()
{
  pthread_t thread;
  fprintf (stderr, "main thread pid is %d\n", (int) getpid ());
  pthread_create (&thread, NULL, &thread_function, NULL);
  /* Spin forever.  */
  while (1);
  return 0;
}
```

### 3.5. La misma operación con el mismo dato

Tal y como hemos visto a lo largo de la guia un solo proceso puede contener múltiples hilos los cuales ejecutan de manera independiente partes del mismo programa. Visto en términos de hilos un proceso está dividido en dos partes:
* **Parte 1**: Esta contiene los recursos usados por el programa completo tales como las instrucciones del programa y los datos globales. 
* **Parte 2**: Información relacionada con el estado de ejecución, tal como el program counter y el stack. Esta parte es la que se refiere al hilo propiamente.


<p align = 'center'>
![comparacion](/img/labs/tutoriales/hilos/mem_and_threads.png)
</p>


Lo anterior hace importante distinguir en el momento de paralelizar a nivel de código que será individual (asociado a cada hilo únicamente) y que será compartido (asociado a todos los hilos). La siguiente tabla muestra esto: 

|Parte 1 - Compartido|Parte 2 - Individual|
|---|---|
|<ul> <li> global memory, including the initialized data and uninitialized data</li> <li> heap segments</li> <li>process ID and parent process ID</li> <li>process group ID and session ID</li> <li>controlling terminal</li> <li>process credentials (user and group IDs)</li> <li>open file descriptors</li> <li>record locks created using fcntl()</li> <li>signal dispositions</li> <li>file system–related information: umask, current working directory, and root directory</li> <li>interval timers (setitimer()) and POSIX timers (timer_create())</li> <li>System V semaphore undo (semadj) values</li> <li>resource limits</li> <li>CPU time consumed (as returned by times())</li> <li>resources consumed (as returned by getrusage())</li> <li>nice value (set by setpriority() and nice()).</li> </ul>|<ul> <li>thread ID</li> <li>signal mask</li> <li>thread-specific data</li> <li>alternate signal stack (signaltstack())</li> <li>the errno variable</li> <li>floating-point environment </li> <li>realtime scheduling policy and priority </li> <li>CPU affinity (Linux-specific)</li> <li>capabilities (Linux-specific)</li> <li>stack (local variables and function call linkage information).</li> </ul>|

En el siguiente ejemplo sencillo se muestran las implicaciones de lo que se mencionó con anterioridad.

#### Ejemplo 5

Compartiendo variables entre hilos ([lab4_p1_example5.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example5.c)). 

```c showLineNumbers
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>

/* Global variable */
int x;

void fd(void);

int main(void) {
  pthread_t threads_ids[4];
  int i;
  for(i = 0; i < 4; i++) {
    pthread_create(&threads_ids[i],NULL,(void *)fd, NULL);
    printf("Iniciando hilo: %d\n", i + 1);
  }
  for(i = 0; i < 4; i++) {
    pthread_join(threads_ids[i],NULL);
  }
}

void fd(void) {
  int i;
  printf("Thread PID: %lu \n-> x = %d (before to be incremented 1000 times for this thread)\n", 
         (unsigned long)pthread_self(),x);
  for(i = 1;i <=1000;i++) {
    x++;
  }
}
```

**Preguntas**
1. Analice el código del presente ejemplo. ¿Qué hace?
2. ¿Cuántos hilos tiene el proceso?
3. Ejecute el código muchas veces. ¿Los hilos se ejecutan en el mismo orden siempre? ¿esto es lo que usted esperaba? 
4. ¿Qué opina al respecto de los identificadores para los hilos? ¿Cuál es la razón para tener este valor?


### 3.6. Retornar un valor desde el hilo

Cuando el segundo argumento que se pasa a `pthread_join` no es nulo, el valor de retorno del hilo será colocado en la la localización apuntada por dicho argumento. En el siguiente código se resalta esto:

#### Ejemplo 6

En el siguiente ejemplo ([lab4_p1_example6.c](/code/labs/tutoriales/hilos/parte1/lab4_p1_example6.c)) se muestra el código:

```c showLineNumbers
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

/* Funcion para calcular primo.*/
void* calcular_primo (void* arg);

int main(){
  pthread_t id_hilo;
  int cual_primo = 5000;
  int* primo;  
  // Inicia el hilo, se requiere el 5000-iesimo numero primo
  pthread_create(&id_hilo, NULL, &calcular_primo, &cual_primo);
  // Puedo hacer algo mientras... si quiero
  // Espero que el número sea calculado y retornado
  pthread_join(id_hilo, (void *) &primo);
  // Imprimo el número entregado
  printf("El %d-esimo número primo es %d\n", cual_primo, *primo);
  free(primo);
  return 0;
}

/* Calcula los numeros primos sucesivamente. retorna el n-esimo 
numero primo donde n es el valor apuntado por arg*/
void* calcular_primo (void* arg){
  int candidato = 2;
  int n = *((int*)arg);
  int factor;
  int es_primo;
  while(1) {
    es_primo = 1;
    for(factor = 2; factor < candidato; factor++) {
      if(candidato % factor == 0) {
	    es_primo = 0;
	    break;
      }
    }
    if(es_primo) {
      if (--n == 0) {
	    int* p_c = malloc(sizeof(int));
	    *p_c = candidato;
        return p_c;
      }
    }
    candidato++;
  }
  return NULL;
}
```

**Preguntas**
1. ¿Cómo es el funcionamiento del código presentado? 
2. Según lo visto en este ejercicio ¿Cuál es la forma de retornar valores desde un hilo? Explique de manera clara y en sus propias palabras. 
3. Modifique el programa del punto anterior, de manera que pueda obtener el tiempo que demora la ejecución del hilo (Investigue sobre la función **`gettimeofday`**).

## 4. Ejemplos de refuerzo

1. El siguiente ejemplo ([simple.c](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/simple.c)) muestra un programa que ejecuta 3 tareas empleando un solo hilo.  
   
   ```c showLineNumbers
   #include <stdio.h>

   void do_one_thing(int *);
   void do_another_thing(int *);
   void do_wrap_up(int, int);

   int r1 = 0, r2 = 0;

   extern int main(void) {
     do_one_thing(&r1);
     do_another_thing(&r2);
     do_wrap_up(r1, r2);
     return 0;
   }

   void do_one_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing one thing\n");
         for (j = 0; j < 10000; j++) x = x + i;
           (*pnum_times)++;
         }
       }

   void do_another_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing another \n");
       for (j = 0; j < 10000; j++) {
         x = x + i;
       }
       (*pnum_times)++;
     }
   }

   void do_wrap_up(int one_times, int another_times) {
     int total;
     total = one_times + another_times;
     printf("wrap up: one thing %d, another %d, total %d\n", 
            one_times, another_times, total);
   }
   ```

   Compilando el programa con el siguiente comando se tiene:

   ```
   gcc simple.c -o simple.out -lpthread
   ```

   Al ejecutarlo la salida será la siguiente:

   ```
   $ ./simple.out 
   doing one thing
   doing one thing
   doing one thing
   doing one thing
   doing another 
   doing another 
   doing another 
   doing another 
   wrap up: one thing 4, another 4, total 8
   ```

   Nótese que cada una de las tareas se hace de manera secuencial. La siguiente tarea resalta este caso esto en el mapa de memoria asociado al proceso (de esta aplicación) que ejecuta un solo hilo.

   <p align = 'center'>
   ![comparacion](/img/labs/tutoriales/hilos/ref_example1.jpg)
   </p>

2. El siguiente ejemplo ([simple_threads.c](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/simple_threads.c)) ejecuta las mismas 3 tareas, sin embargo, mediante el uso de hilos el código es paralelizado mediante la creación de dos hilos (para un total de tres hilos con el principal). Para el caso, los hilos hijos ejecutan 2 de las 3 tareas mientras que el hilo padre ejecuta la otra tarea.
   
   ```c showLineNumbers
   #include <stdio.h>
   #include <pthread.h>

   void do_one_thing(int *);
   void do_another_thing(int *);
   void do_wrap_up(int, int);

   int r1 = 0, r2 = 0;

   extern int main(void) {
     pthread_t thread1, thread2;
     
     pthread_create(&thread1,
                     NULL,
                     (void *) do_one_thing,
                     (void *) &r1
                   );

      pthread_create(&thread2,
                     NULL,
                     (void *) do_another_thing,
                     (void *) &r2
                    );

      pthread_join(thread1,  NULL);
      pthread_join(thread2,  NULL);

      do_wrap_up(r1, r2);
      return 0;
   }

   void do_one_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing one thing\n");
       for (j = 0; j < 10000; j++) { 
         x = x + i;
       }
       (*pnum_times)++;
     }
   }

   void do_another_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing another \n");
       for (j = 0; j < 10000; j++) {
         x = x + i;
       }
       (*pnum_times)++;
     }
   }

   void do_wrap_up(int one_times, int another_times) {
     int total;
     total = one_times + another_times;
     printf("wrap up: one thing %d, another %d, total %d\n",
            one_times, another_times, total);
   }
   ```

   Compilando el programa con el siguiente comando se tiene:
   
   ```
   gcc simple_threads.c -o simple_threads.out -lpthread
   ```
   
   Al ejecutarlo la salida será la siguiente:

   ```
   $ ./simple_threads.out 
   doing one thing
   doing one thing
   doing one thing
   doing one thing
   doing another 
   doing another 
   doing another 
   doing another 
   wrap up: one thing 4, another 4, total 8
   ```

   Nótese que a diferencia del ejemplo 1, cada uno de los hilos hijos tiene su propio contexto, sin embargo hay otras cosas que se comparten como las instrucciones asociadas a codigo (text), las variables globales (Data) y el heap entre otros.

   <p align = 'center'>
   ![comparacion](/img/labs/tutoriales/hilos/ref_example2.jpg)
   </p>

3. El siguiente ejemplo ([simple_process.c](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/simple_process.c)) presenta la misma salida de los dos ejemplos anteriores pero para el caso, la solución se hace empleando procesos. Note que el comportamiento es similar que el ejemplo anterior, sin embargo el desarrollo de las tareas no es llevada a cabo por hilos sino por procesos.
   
   ```c showLineNumbers
   #include <stdlib.h>
   #include <stdio.h>
   #include <unistd.h>
   #include <sys/types.h>
   #include <sys/ipc.h>
   #include <sys/shm.h>
   #include <sys/wait.h>
   
   void do_one_thing(int *);
   void do_another_thing(int *);
   void do_wrap_up(int, int);

   int shared_mem_id;
   int *shared_mem_ptr;
   int *r1p;
   int *r2p;
   
   extern int main(void) {
     pid_t  child1_pid, child2_pid;
     int  status;

     /* initialize shared memory segment */
     shared_mem_id = shmget(IPC_PRIVATE, 2*sizeof(int), 0660);
     shared_mem_ptr = (int *)shmat(shared_mem_id, (void *)0, 0);
     r1p = shared_mem_ptr;
     r2p = (shared_mem_ptr + 1);

     *r1p = 0;
     *r2p = 0;

     if ((child1_pid = fork()) == 0) {
       /* first child */
       do_one_thing(r1p);
       exit(0);
     }

     /* parent */
     if ((child2_pid = fork()) == 0) {
       /* second child */
       do_another_thing(r2p);
       exit(0);
     }

     /* parent */
     waitpid(child1_pid, &status, 0);
     waitpid(child2_pid, &status, 0);
     do_wrap_up(*r1p, *r2p);
     return 0;
   }

   void do_one_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing one thing\n");
       for (j = 0; j < 10000; j++) {
         x = x + i;
       }
       (*pnum_times)++;
     }
   }

   void do_another_thing(int *pnum_times) {
     int i, j, x;
     for (i = 0;    i  <  4;  i++) {
       printf("doing another \n");
       for (j = 0; j < 10000; j++) {
         x = x + i;
       }
       (*pnum_times)++;
     }
   }

   void do_wrap_up(int one_times, int another_times) {
     int total;
     total = one_times + another_times;
     printf("wrap up: one thing %d, another %d, total %d\n",
             one_times, another_times, total);
   }
   ```

   El comando de compilación para el caso:

   ```
   gcc simple_process.c -o simple_process.out
   ```

   Finalmente la salida:
   
   ```
   $ ./simple_process.out 
   doing one thing
   doing one thing
   doing one thing
   doing one thing
   doing another 
   doing another 
   doing another 
   doing another 
   wrap up: one thing 4, another 4, total 8
   ```

   Nótese que una vez se lleva a cabo el `fork`, se crea un nuevo proceso completamente independiente con su propio espacio de memoria virtual y con las variables completamente independientes entre sí (y por ende no compartidas). Esta es la principal diferencia con el caso de los hilos.

   <p align = 'center'>
   ![comparacion](/img/labs/tutoriales/hilos/ref_example3b.jpg)
   </p>

4. El siguiente ejemplo ([thread_file.c](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/thread_file.c)) tomado de la página **PTHREAD TUTORIAL – SIMPLIFIED** ([link](https://vcansimplify.wordpress.com/2013/03/08/pthread-tutorial-simplified/)) muestra un ejemplo en el cual un hilo hace tareas relacionadas con manejo de archivos. Entenderlo puede ser de utilidad para el desarrollo de la práctica de laboratorio.

   ```c showLineNumbers
   /*
   Ejemplo tomado y levemente (casi nada) adaptado de:
   -> https://vcansimplify.wordpress.com/2013/03/08/pthread-tutorial-simplified
   */

   #include<stdio.h>
   #include<pthread.h>
   #include <unistd.h>

   void* say_hello(void* data) {
     char *str;
     str = (char*)data;
     while(1) {
       printf("%s\n",str);
       usleep(1);
     }
   }

   void* open_file(void* data) {
     char *str;
     str = (char*)data;
     printf("Opening File\n");
     FILE* f = fopen(str,"w");
     for(int i = 0; i < 100; i++) {
       fprintf(f,"%d\n",i);
     }
     fclose(f);
     printf("Closing File\n");
   }

   void main() {
     pthread_t t1,t2;
     pthread_create(&t1,NULL,open_file,"hello.txt");
     pthread_create(&t2,NULL,say_hello,"The CPU is mine now :D");
     pthread_join(t1,NULL);
   }
   ```

   Para más información e ideas de como trabajar puede apoyarse en foros, uno de tantos se muestra en la siguiente [página](https://stackoverflow.com/questions/47006013/what-is-the-best-way-to-have-multiple-threads-read-a-file-at-the-same-time) del siempre exitoso stackoverflow.

5. El siguiente ejemplo está tomado del libro **An Introduction to Parallel Programming** de Peter Pacheco y pretende ser un abrebocas al curso de Computación paralela ofrecido como una electiva en el departamento. El objetivo del ejemplo consiste en multiplicar una matrix `A` de `mxn` por un vector `x` de `n` elementos. 
   
   Para este caso en particular, la siguiente figura muestra el resultado al multiplicar la `i-ésima` fila de la matrix `A` por el vector `x` para obtener el `i-ésimo` elemento del vector resultante `y`.

   <p align = 'center'>
   ![comparacion](/img/labs/tutoriales/hilos/ref_example5a.png)
   </p>

   * **Solución secuencial**
  
     La expresión de arriba para el i-ésimo componente del vector resultante y está dada por la siguiente expresión:

     $$
     y_i=\sum_{j=0}^{n-1}a_{ij}x_j
     $$   

     El fragmento de código que implementa la expresión anterior para calcular todos los elementos del vector resultante está dado por:

     ```c
     /* Para cada fila de A */
     for(i = 0; i < m; i++) {
       y[i] = 0.0;
       for (j = 0; j < n; j++) {
         // highlight-start
         y[i] += A[i][j]*x[j];
         // highlight-end
       }
     }
     ```

     En [`mat_vect_mult.c`](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/mat_vect_mult.c) se encuentra el código solución. Inicialmente vamos a realizar un caso de test en un shell online de python. Para ello introduzca los siguientes comandos:

     ```py
     >>> import numpy as np
     >>> A = [ [1, 2, 3], [1, 10, 13], [-2, -10, 4], [5, 6, 9] ]
     >>> B = [ -7, 4, 12 ]
     >>> C = np.mult(A,B)
     >>> C
     array([ 37, 189,  22,  97])
     ```
     
     Solo resta probar nuestro ejemplo y comparar resultados:

     ```
     gcc -g -Wall -o mat_vect_mult mat_vect_mult.c
     ```

     Ejecutando la aplicación empleando los mismos datos de test del caso anterior tenemos:

     ```
     ./mat_vect_mult
     Enter the number of rows
     4
     Enter the number of columns
     3
     Enter the matrix A
     1
     2
     3
     1
     10
     13
     -2
     -10
     4
     5
     6
     9
     Enter the vector x
     -7
     4
     12

     The vector y
     37.000000 189.000000 22.000000 97.000000 
     ```

  *  **Solución paralela**:
  
     Recordemos que para el caso paralelo es bueno formular una serie de preguntas antes de empezar a plantear el algoritmo, estas básicamente se resumen en responder los siguientes cuestionamientos generales los cuales apuntan a definir los parámetros que se emplearán en la función `pthread_create`:
     1. ¿Como se puede paralelizar del problema? 
     2. ¿Que necesita el hilo? 
     3. ¿Qué hará el hilo? el cual plantea el desarrollo de la parte algorítmica.

     <p align = 'center'>
     ![comparacion](/img/labs/tutoriales/hilos/ref_example5b.png)
     </p>

     Para este problema particular de la matrix el tratamiento de estas preguntas se resume a continuación:
     1. **¿Como se puede paralelizar el problema?** Teniendo en cuenta que cada componente del vector respuesta es la multiplicación de una fila de la matrix por el vector de entrada y que el cálculo de un componente no necesita esperar el cálculo de otro, el problema se presta para que la matrix se divida en varias submatrices a la entrada las cuales aportaran algunos de los componentes del resultado general de modo que cada hilo de los creados será el responsable de una submatrix.
     2. **¿Que necesita el hilo?** 
        1. **Elementos involucrados de manera general**: Matrix `A`, vector de entrada `x` y vector de salida `y`. 
        2. **Entradas a cada hilo**: Cada submatrix (definida por los índices final e inicial de cada fila involucrada en el calculo), el vector de entrada `x`. Estas se manejarán como variables globales.
        3. **Salidas de cada hilo**: Componentes resultantes de la multiplicación de cada submatrix por el vector de entrada, también se maneja como variable global.
     3. **¿Qué hará el hilo?**
        1. Aca va el código del algoritmo, este será asociado a la función start asociada que se corre cuando se crea e hilo.
        2. **Restricciones**: El número de elementos del vector resultante debe ser múltiplo del número de hilos que la salida sea válida.
 
     La siguiente figura muestra una descripción de la solución del problema cuando se usan 3 hilos:

     <p align = 'center'>
     ![comparacion](/img/labs/tutoriales/hilos/ref_example5c.png)
     </p>

     Nótese bien los componentes involucrados por hilo, la siguiente figura compara los casos con 2 y 3 hilos:

     <p align = 'center'>
     ![comparacion](/img/labs/tutoriales/hilos/ref_example5d.png)
     </p>

     Nótese que el número de componentes cambia. Finalmente el caso genérico y a partir del cual se definirá el pseudocódigo del algoritmo de la función de start será el siguiente:

     <p align = 'center'>
     ![comparacion](/img/labs/tutoriales/hilos/ref_example5e.png)
     </p>

     El código asociado se muestra a continuación: 
    
     ```c
     /* Parallel function */
     /*------------------------------------------------------------------
     * Function:       Pth_mat_vect
     * Purpose:        Multiply an mxn matrix by an nx1 column vector
     * In arg:         rank
     * Global in vars: A, x, m, n, thread_count
     * Global out var: y
     */
     
     void* Pth_mat_vect(void* rank) {
       long my_rank = (long) rank;
       int i, j;
       int local_m = m/thread_count;
       // highlight-start
       int my_first_row = my_rank*local_m;
       int my_last_row = (my_rank+1)*local_m - 1;
       // highlight-end
       for (i = my_first_row; i <= my_last_row; i++) {
         y[i] = 0.0;
         for (j = 0; j < n; j++) {
           y[i] += A[i][j]*x[j];
         }
       }
       return NULL;
     } /* Pth_mat_vect */     
     ```

     El archivo [pth_mat_vect.c](/code/labs/tutoriales/hilos/parte1/ejemplos_de_refuerzo/pth_mat_vect.c) contiene el código solución proporcionado por Pacheco. Ejecute el programa con las mismas entradas del caso de uso anterior de la siguiente manera:

     ```c
     #include <stdio.h>
     #include <stdlib.h>
     #include <pthread.h>

     /* Global variables */
     int thread_count;
     int m, n;
     double* A;
     double* x;
     double* y;
     
     /* Serial functions */
     void Usage(char* prog_name);
     void Read_matrix(char* prompt, double A[], int m, int n);
     void Read_vector(char* prompt, double x[], int n);
     void Print_matrix(char* title, double A[], int m, int n);
     void Print_vector(char* title, double y[], double m);

     /* Parallel function */
     void *Pth_mat_vect(void* rank);

     /*------------------------------------------------------------------*/
     int main(int argc, char* argv[]) {
       long thread;
       pthread_t* thread_handles;

       if (argc != 2) Usage(argv[0]);
       thread_count = atoi(argv[1]);
       thread_handles = malloc(thread_count*sizeof(pthread_t));

       printf("Enter m and n\n");
       scanf("%d%d", &m, &n);

       A = malloc(m*n*sizeof(double));
       x = malloc(n*sizeof(double));
       y = malloc(m*sizeof(double));
   
       Read_matrix("Enter the matrix", A, m, n);
       Print_matrix("We read", A, m, n);

       Read_vector("Enter the vector", x, n);
       Print_vector("We read", x, n);

       for (thread = 0; thread < thread_count; thread++)
         pthread_create(&thread_handles[thread], NULL,
                        Pth_mat_vect, (void*) thread);

       for (thread = 0; thread < thread_count; thread++)
         pthread_join(thread_handles[thread], NULL);

       Print_vector("The product is", y, m);

       free(A);
       free(x);
       free(y);

       return 0;
     }  /* main */

     ... 

     /*------------------------------------------------------------------
     * Function:       Pth_mat_vect
     * Purpose:        Multiply an mxn matrix by an nx1 column vector
     * In arg:         rank
     * Global in vars: A, x, m, n, thread_count
     * Global out var: y
     */
     void* Pth_mat_vect(void* rank) {
       long my_rank = (long) rank;
       int i, j;
       int local_m = m/thread_count;
       int my_first_row = my_rank*local_m;
       int my_last_row = (my_rank+1)*local_m - 1;
       for (i = my_first_row; i <= my_last_row; i++) {
         y[i] = 0.0;
         for (j = 0; j < n; j++) {
           y[i] += A[i][j]*x[j];
         }
       }
        return NULL;
     } /* Pth_mat_vect */
     ...
     ```
     
     Cabe anotar tal y como lo dice el autor, el manejo de variables globales en el problema anterior no es buena idea. Una forma alternativa sería emplear alguna estructura como entrada a la función de start del hilo. Lo animamos a que lo intente (Para ello puede basarse en el ejemplo 2 de la sección 2.2 de la guia).

## 5. Recomendaciones

:::tip
Cuando trabaje con hilos tener en cuenta las siguientes claves puede sacarlo de más de un apuro:
1. El número de hilos creados dependerá del tipo de aplicación. Este puede ser conocido e incluso definido como sucede en el caso de problemas asociados a operaciones con matrices (como se mostró en el ejemplo de Pacheco) o desconocido como en las aplicaciones web las cuales se caracterizan por la creación de hilos (uno por cada conexión) bajo demanda lo cual hace que el número de hilos no se conozca y dependa por ende del número de conexiones que se van estableciendo.
2. Cuando se emplean hilos en la solución de problemas, el empleo de variables globales puede introducir bugs confusos y sutiles por lo tanto se recomienda su uso sólo a situaciones en las cuales son realmente necesarias, por ejemplo cuando se hace necesario el uso de variables compartidas.
:::

## 7. Ejercicios propuestos

En construcción...

## 6. Referencias

* https://sourcerytools.github.io/advancedlinuxprogramming/
* https://www.cs.fsu.edu/~baker/realtime/restricted/notes/pthreads.html
* https://www.oreilly.com/library/view/pthreads-programming/9781449364724/ch01.html
* https://docs.google.com/document/d/1o9UwvMTWSZyqVP35_Je0g9XFXAEnf2JFmyUxfEf9d5I/edit
* Silberschatz, A., Cagne, G., Galvin, P. Operating system concepts. Wiley, 2005.
* Java2 API – Thread. Available online: http://download.oracle.com/javase/1.3/docs/api/java/lang/Thread.html. Last visited: 22/09/11
* https://computing.llnl.gov/tutorials/pthreads/
* https://hpc.llnl.gov/training/tutorials#training_materials
* https://www.cs.cmu.edu/afs/cs/academic/class/15492-f07/www/pthreads.html 
* https://bootlin.com/doc/legacy/posix/posix-api.pdf 
* https://bootlin.com/doc/legacy/posix/posix-api-labs.pdf
* http://www.cs.fsu.edu/~baker/realtime/restricted/notes/pthreads.html 
* http://profesores.elo.utfsm.cl/~agv/elo330/2s08/lectures/POSIX_Threads.html 
* https://users.cs.cf.ac.uk/Dave.Marshall/C/node29.html 
* https://www.geeksforgeeks.org/pthread_self-c-example/ 
* http://dis.um.es/~ginesgm/medidas.html 
* https://users.cs.cf.ac.uk/Dave.Marshall/C/node32.html
* https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/4_Threads.html
* https://www.geeksforgeeks.org/multithreading-c-2/ 
* https://www.safaribooksonline.com/library/view/pthreads-programming/9781449364724/ch01.html 
* https://github.com/NatiiDC/SistemasParalelos2017
* https://github.com/MariaBamundo/Learning-C/blob/master/p_threads/pthread_pi.c
* https://github.com/angrave/SystemProgramming/wiki/Pthreads,-Part-1:-Introduction 
* https://www.geeksforgeeks.org/multiplication-matrix-using-pthreads/ 
* https://github.com/imsure/parallel-programming/blob/master/matrix-multiplication/matrix-mul-pthread.c 
* https://github.com/koswesley/Pthread-Matrix-Multiplication 
* http://www.par.tuwien.ac.at/teaching/2017w/184.710.html
* http://www-users.cs.umn.edu/~karypis/parbook/
* http://booksite.elsevier.com/9780123742605/
















