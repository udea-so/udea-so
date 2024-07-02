---
sidebar_position: 1
label: "Sincronización"
Description: "Tutorial sobre sincronización"
---


import Image from '@theme/IdealImage';

# Hilos y sincronización

:::tip[Objetivos]
* Identificar una condición de competencia y los mecanismos existentes para evitarla.
* Comprender y hacer uso de mutex y semáforos para evitar problemas de concurrencia.
* Explorar el uso de la técnica de memoria compartida para comunicación entre procesos e hilos.
:::

## 1. Comunicación entre Procesos/Hilos a través de memoria compartida.

Para el desarrollo de aplicaciones cooperativas usando técnicas de multiprogramación y multihilo, es necesario poseer herramientas con las cuales se facilite una comunicación efectiva entre los diferentes entes de procesamiento existentes en una máquina (hilos o procesos). Para fecilitar esto, el sistema operativo posee un conjunto de opciones de comunicación que incluye las tuberías, los sockets, el paso de mensajes y la memoria compartida. 

La técnica de comunicación a través de memoria compartida es una de las más usadas actualmente debido a su facilidad en la implementación y la simpleza en su funcionamiento. Cuando estamos hablando estrictamente de hilos, ellos por definición comparten una serie de recursos del proceso, entre los que se encuentran los espacios de memoria **heap** y **global** que actúan como una región de memoria compartida que permite la comunicación entre hilos.

Para los procesos la situación cambia, ya que éstos no poseen a priori, ningún espacio de memoria compartido, por lo que se hace necesaria la intervención del sistema operativo para asignar un espacio de memoria que sea visible por los procesos que se desean comunicar.

En ambos casos tras la definición de un espacio de memoria se hace necesario sincronizar el acceso a la misma, pues se puede presentar una condición de competencia que altere el buen funcionamiento de la aplicación (para profundizar en este concepto remítase al material de clase o al capítulo 2 del libro de Tanenbaum). 

## 2. Comunicación entre Hilos

En la clase de sistemas operativos se abordó el uso de semáforos como mecanismo de sincronización entre procesos e hilos. Debido a que el concepto de semáforo se aplica de manera similar en procesos e hilos, se ha decidido mostrar el funcionamiento solo para estos últimos y se deja al estudiante la tarea de verificar el funcionamiento en procesos. A continuación realizaremos algunos ejemplos acerca del uso de esta técnica.

### 2.1. Condición de competencia

En el siguiente ejemplo se tienen múltiples hilos que acceden a una posición de memoria compartida. Se espera entonces que se configure una condición de competencia. Este es el código:

```c showLineNumbers
#include <stdio.h>
#include <pthread.h>
#define NUMTHREADS 200
#define MAXCNT 10000

/* Global variables - shared between threads */
double counter = 0;
/* Declaring functions*/
void* counting(void *);

int main(void) {
  pthread_t tid[NUMTHREADS];
  int i=0;
 
  for( i=0; i<NUMTHREADS; i++){
     pthread_create (&tid[i], NULL, &counting, NULL);
  }
 
  for( i=0; i< NUMTHREADS; i++){
     pthread_join(tid[i], NULL);
  }
 
  printf("\nCounter must be in: %d\n", MAXCNT*NUMTHREADS);
  printf("\nCounter value is: %.0f\n\n", counter);

  return 0;
}

/* Function Thread*/
void* counting(void * unused) {
  int i=0;
  for(i=0; i<MAXCNT; i++)
     // highlight-start  
     counter++;
     // highlight-end  
  return NULL;
}
```

Una **condición de competencia** se de cuando varios hilos intentan acceder a la vez a un recurso compartido sin una politica de sincronizacion adecuada. Para facilitar la comprensión de lo que sucede cuando **condición de competencia** se muestra la siguiente figura:

<p align = 'center'>
<figure>
![portada](/img/labs/tutoriales/sincronizacion/race-condition.png)
<figcaption>**Fig 1**. Condición de competencia ([link](https://bigdata-guide.blogspot.com/2014/01/what-is-race-condition.html))</figcaption>
</figure>
</p>

Suponiendo que en código anterior se empleen dos hilos (`Thread A` y `Thread B`, como se muestra en la gráfica), se puede observar que el recurso compartido al cual accede cada hilo (a traves de la función `counting`) es la variable contador (`counter`). 

Como el acceso a `counter` no esta sincronizado el valor de esta variable no se puede predecir por lo que puede no ser el esperado lo cual se puede ver ya que el acceso a `counter` por parte del segundo hilo no se da después de que el primer hilo actualiza (escribe) su valor en memoria si no antes de modo que, el valor del `counter` definitivo no será `19` como se esperaría tras los dos incrementos (uno por cada hilo) sino `18`.

#### Preguntas

1. Ejecute este código en varias oportunidades, verifique que se presente una condición de competencia. ¿Cómo se presenta en pantalla esta condición de competencia? ¿Cuál es el motivo del problema? 
2. ¿Cuál es la región crítica para este programa? ¿Cuáles son las posiciones de memoria compartida que generan el problema?

### 2.2. Mutex

La solución para asegurar el buen funcionamiento del código del ejercicio anterior es permitir que solo uno de los hilos se encuentre en la región crítica (parte asociada al recurso compartido). En la librería `pthread` el mecanismo para asegurar sincronización entre hilos se conoce como `mutex` (Abreviación de **Mutual Exclusion**). La siguiente figura ilustra el concepto:

<p align = 'center'>
<figure>
![mutex](/img/labs/tutoriales/sincronizacion/mutex.png)
<figcaption>**Fig 2**. Sección critica y mutex</figcaption>
</figure>
</p>

Para crear un `mutex`, se debe crear la variable `pthread_mutex_t` y luego llamar la función `pthread_mutex_init` para inicializarlo.  La parte relacionada con los hilos no cambia, se usan de la misma manera las funciones típicas (`pthread_start()`, `pthread_join()`, etc); lo único que cambia es que en la tarea (función `counting` para el caso) ejecutada por cada hilo se deberá **asegurar la región crítica empleando mutex**, eso es todo. Para asegurar la sección crítica se emplea la función `pthread_mutex_lock`, la cual una vez invocada protegerá la región crítica evitando que otros hilos accedan a esta. Una vez que el código dentro de la región crítica se ha ejecutado, se procede a invocar la función `pthread_mutex_unlock` para liberar el `mutex` de modo que los demás hilos puedan competir nuevamente por el acceso a la región crítica. La siguiente figura muestra el efecto de asegurar y liberar el `mutex` (en este caso la variable `lock`) para controlar el acceso a la región crítica:

<p align = 'center'>
<figure>
![mutex](/img/labs/tutoriales/sincronizacion/acceso-mutex.png)
<figcaption>**Fig 3**. Acceso a la región critica usando un `mutex`</figcaption>
</figure>
</p>

A continuación se presenta el ejemplo código del ejemplo anterior modificado. En este se hace uso de un `mutex` la facilitar la sincronización entre hilos:

```c showLineNumbers
#include <stdio.h>
#include <pthread.h>
#define NUMTHREADS 200
#define MAXCNT 10000

/* Global variables - shared between threads */
double counter = 0;
pthread_mutex_t lock;

/* Declaring functions*/
void* counting(void *);

int main(void) {
  pthread_t tid[NUMTHREADS];
  int i=0;

  /* mutex init*/
  if (pthread_mutex_init(&lock, NULL) != 0) {
    printf("\n mutex init failed\n");
    return 1;
  }

  for( i=0; i<NUMTHREADS; i++) {
    pthread_create (&tid[i], NULL, &counting, NULL);
  }

  for( i=0; i< NUMTHREADS; i++) {
    pthread_join(tid[i], NULL);
  }
  /* mutex destroy*/
  pthread_mutex_destroy(&lock);

  printf("\nCounter must be in: %d\n", MAXCNT*NUMTHREADS);
  printf("\nCounter value is: %.0f\n\n", counter);
  return 0;
}

/* Function Thread*/
void* counting(void * unused) {
  int i=0;
  for(i=0; i<MAXCNT; i++){
    // highlight-start
    pthread_mutex_lock(&lock);
    counter++;
    pthread_mutex_unlock(&lock);
    // highlight-end
  }
  return NULL;
}
```

#### Preguntas

1. ¿Cuál es la diferencia entre el código del ejerció anterior y el presente?
2. ¿Según el tema de la clase cuál es principio de funcionamiento de este código? 
3. Ejecute en varias ocasiones este código. ¿Se presenta alguna condición de competencia?


### 2.3. Semáforos

To Do... Dar una breve descripción sobre los semaforos. 

* https://preshing.com/20150316/semaphores-are-surprisingly-versatile/
* https://www.csl.mtu.edu/cs4411.choi/www/Resource/Semaphore.pdf
* https://www.csl.mtu.edu/cs4411.choi/www/

Para el uso de los semáforos se requiere incluir la librería `semaphore.h`. Un semáforo es representado por la variable `sem_t`. A continuación se listan operaciones que se pueden hacer con los semáforos y la forma de inicializarlos y eliminarlos dependiendo del tipo de semáforo.


### 2.3.1. Operaciones con semáforos

#### Función `sem_wait`

La función `sem_wait` disminuye (bloquea) el valor del semáforo. Si el valor del semáforo es mayor que cero, este disminuye en uno y la función retorna inmediatamente. Si el valor del semáforo es cero, la función se bloquea (espera) hasta que el valor del semáforo sea mayor que cero y la decrementación pueda realizarse.

:::info[sem_wait]

**Sintaxis**

```c
int sem_wait(sem_t *sem);
```

**Parámetros de la función**:
* **`sem`**: Un puntero al objeto semáforo

**Retorna**:
* **`0`**: si el contador fue disminuido.
* **`-1`**: En caso de error
:::

#### Función `sem_trywait`

La función `sem_trywait` se utiliza para intentar decrementar (bloquear) un semáforo sin bloquearse si el semáforo no está disponible. A diferencia de `sem_wait`, que bloquea hasta que el semáforo esté disponible, `sem_trywait` retorna inmediatamente, ya sea que haya podido o no decrementar el semáforo. En el caso de esta función, si el valor del semáforo es mayor que cero, se procede a llevar a cabo el decremento y la función retorna inmediatamente. Si el valor del semáforo es cero, la función no se bloquea y retorna un valor indicando que no pudo decrementar el semáforo.

:::info[sem_trywait]

**Sintaxis**

```c
int sem_trywait(sem_t *sem);
```

**Parámetros de la función**:
* **`sem`**: Un puntero al objeto semáforo

**Retorna**:
* **`0`**: si el contador fue disminuido.
* **`-1`**: En caso de fallo.
:::

#### Función `sem_post`

La función `sem_post` incrementa (desbloquea) el semáforo.

:::info[sem_post]

**Sintaxis**

```c
int sem_post(sem_t *sem);
```

**Parámetros de la función**:
* **`sem`**: Un puntero al objeto semáforo

**Retorna**:
* **`0`**: si el contador fue disminuido.
* **`-1`**: En caso de error
:::

#### Función `sem_getvalue`

La función `sem_getvalue` se utiliza para obtener el valor actual de un semaforo. 

:::info[sem_getvalue]

**Sintaxis**

```c
int sem_getvalue(sem_t *sem, int *val);
```

**Parámetros de la función**:
* **`sem`**: Apuntador al objeto semáforo.
* **`val`**: Apuntador a un entero donde se almacenará el valor actual del semáforo.

**Retorna**:
* **`0`**: si valor es copiado con éxito.
* **`-1`**: En caso de error
:::

### 2.3.2. Operaciones para semáforos anonimo (sin nombre)

#### Función `sem_init`

La función `sem_init` se utiliza para inicializar un semáforo anonimo.

:::info[sem_init]

**Sintaxis**

```c
int sem_init(sem_t *sem, int pshared, unsigned int val);
```

**Parámetros de la función**:
* **`sem`**: Apuntador al semáforo que se va a inicializar.
* **`pshared`**: Un entero que indica si el semáforo es compartido entre procesos o entre hilos del mismo proceso. Si `pshared` es `0`, el semáforo es compartido entre hilos del mismo proceso; si no,  el semáforo es compartido entre procesos (lo cual requiere que el semáforo esté en una región de memoria compartida). 
* **`val`**: El valor inicial del semáforo. 

**Retorna**:
* **`0`**: si valor es copiado con éxito.
* **`-1`**: En caso de error
:::

#### Función `sem_destroy`

La función `sem_destroy` Libera el semáforo. Esta función debe ser llamada cuando el semáforo ya no es necesario, (generalmente después de que todos los hilos o procesos han terminado de utilizarlo). Es importante asegurarse de que no haya hilos esperando en el semáforo cuando se llama a sem_destroy, pues cuando esto no se cumple, la función retorna un mensaje de error.

:::info[sem_destroy]

**Sintaxis**

```c
int sem_destroy(sem_t *sem);
```

**Parámetros de la función**:
* **`sem`**: Apuntador al semáforo que se va a inicializar.

**Retorna**:
* **`0`**: si valor es copiado con éxito.
* **`-1`**: En caso de error
:::

### 2.3.3. Operaciones para semáforos con nombre

#### Función `sem_open`

La función `sem_open` se utiliza para crear o abrir un semáforo con nombre. Estos semáforos permiten la sincronización entre procesos no relacionados mediante el uso de un nombre único en el sistema de archivos.

:::info[sem_open]

**Sintaxis**

```c
sem_t *sem_open(const char *name, int oflag, mode_t mode, unsigned int value);
```

**Parámetros de la función**:
* **`name`**: El nombre del semáforo. Debe comenzar con una barra `/` y ser una cadena única en el sistema de archivos.
* **`oflag`**: Modos de apertura que pueden incluir:
  *  **`O_CREAT`**: Crear el semáforo si no existe.
  *  **`O_EXCL`**: Usado junto con `O_CREAT` (esto es `O_CREAT | O_EXECL`), crea el semáforo en caso de no existir y falla si este ya existe.
* **Parametros adicionales**: Solo se requieren si se usa `O_CREAT`. Incluyen:
  *  **`mode`**: Permisos del semáforo (por ejemplo, `0644`).
  *  **`value`**: Valor inicial del semáforo.
 

**Retorna**:
* En caso de exito retorna un puntero al objeto `sem_t` que representa el semáforo.
* En caso de fallo, retorna `SEM_FAILED`, y `errno` se establece para indicar el error.
:::

#### Función `sem_close`

La función `sem_close` se utiliza para cerrar un semáforo con nombre que ha sido previamente abierto con `sem_open`. Esta función no destruye el semáforo ni lo elimina del sistema de archivos; simplemente cierra el descriptor del semáforo en el proceso que llama a la función.

:::info[sem_close]

**Sintaxis**

```c
int sem_close(sem_t *sem);;
```

**Parámetros de la función**:
* **`sem`**: Apuntador al objeto semáforo que se va a cerrar.

**Retorna**:
* **`0`**: exito, semaforo liberado
* **`-1`**: en caso de error.
:::

#### Función `sem_unlink`

Elimina el semáforo con nombre, si otros procesos están usando el semáforo, se pospone la eliminación.

La función `sem_unlink` se usa para eliminar un semáforo con nombre del sistema. Si otros procesos están usando el semáforo, se pospone la eliminación hasta que todos los procesos cierren el semaforo.

:::info[sem_unlink]

**Sintaxis**

```c
int sem_unlink(const char *name);
```

**Parámetros de la función**:
* **`name`**: Nombre del semáforo que se va a eliminar. Este debe ser el mismo nombre empleado cuando se uso `sem_open`.

**Retorna**:
* **`0`**: semaforo eliminado
* **`-1`**: en caso de error.
:::

### 2.3.4. Ejemplos de uso de semáforo con hilos

#### Ejemplo 1

Dado el siguiente código:

```c showLineNumbers
#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#define NUMTHREADS 200
#define MAXCNT 10000

/* Global variables - shared between threads */
double counter = 0;
// highlight-start
sem_t sem;
// highlight-end

/* Declaring functions*/
void* counting(void *);

int main(void) {
  // highlight-start
  pthread_t tid[NUMTHREADS];
  // highlight-end
  int i=0;

  /* Semaphore init*/
  sem_init(&sem,0,1);

  for( i=0; i<NUMTHREADS; i++) {
     // highlight-start
     pthread_create(&tid[i], NULL, &counting, NULL);
     // highlight-end
  }

  for( i=0; i< NUMTHREADS; i++) {
     // highlight-start
     pthread_join(tid[i], NULL);
     // highlight-end
  }
  /* Semaphore destroy*/
  // highlight-start
  sem_destroy(&sem);
  // highlight-end
  printf("\nCounter must be in: %d\n", MAXCNT*NUMTHREADS);
  printf("\nCounter value is: %.0f\n\n", counter);
  return 0;
}

/* Function Thread*/
void* counting(void * unused) {
  int i=0;

  for(i=0; i<MAXCNT; i++){
     // highlight-start
     sem_wait(&sem);
     // highlight-end
     counter++;
     // highlight-start
     sem_post(&sem);
     // highlight-end
  }

  return NULL;
}
```

**Preguntas**:
1. Investigue el funcionamiento y los parámetros de las funciones `sem_init`, `sem_wait`, `sem_post` y `sem_destroy`.
2. ¿Cuál es la diferencia del presente ejemplo con el anterior?

#### Ejemplo 2

En el siguiente ejemplo asegura que la tarea `s1` se ejecute antes que `s2`.

```c showLineNumbers
#include<stdio.h>
#include<stdlib.h>
#include<pthread.h>
#include<semaphore.h>
#define NUMTHREADS 3

// highlight-start
sem_t synch;
// highlight-end

void *s1(void *arg);
void *s2(void *arg);
void *s3(void *arg);

int main(){
  int i;
  // highlight-start
  pthread_t tid[NUMTHREADS];
  // highlight-end
  // highlight-start
  sem_init(&synch,0,0);
 
  pthread_create(&tid[0],NULL,&s3,NULL);
  pthread_create(&tid[1],NULL,&s2,NULL);
  pthread_create(&tid[2],NULL,&s1,NULL);
  // highlight-end
 
  for( i=0; i< NUMTHREADS; i++){
     // highlight-start
     pthread_join(tid[i], NULL);
     // highlight-end
  }
  
  // highlight-start
  sem_destroy(&synch);
  // highlight-end
  printf("\nDone !!\n");

  return 0;
}

void *s1(void *arg){ 
  printf("\nS1 Executing...\n");
  // highlight-start
  sem_post(&synch);
  // highlight-end
  return 0;
}

void *s2(void *arg){ 
  printf("\nS2 Waiting...\n");
  // highlight-start
  sem_wait(&synch);
  // highlight-end
  printf("\nS2 Executing...\n");
  return 0;
}

void *s3(void *arg){
  printf("\nS3 Executing...\n");
  return 0;
}
```

**Actividad**:
* Usando semáforos como estrategia de sincronización, modifique el programa anterior con el fin de que siempre se ejecute la tarea `s2` antes que la tarea `s3`. Las tareas se deben ejecutar en el siguiente orden: `s1`, `s2`, `s3`.


## 3. Comunicación entre procesos

Como es bien sabido los procesos no comparten memoria. Si se desea diseñar una aplicación colaborativa entre procesos es necesario usar un mecanismo que permita la comunicación entre estos, ya sea memoria compartida o paso de mensajes. A continuación se presenta un ejemplo muy simple del uso de memoria compartida entre procesos.

### 3.1. Memoria compartida en procesos 

Se tienen dos procesos denominados el servidor y el cliente, el servidor crea una región de memoria compartida y pone una información allí, luego el cliente se adhiere a esa región lee los datos y señaliza de manera simple al servidor para que finalice ([link](https://users.cs.cf.ac.uk/Dave.Marshall/C/node27.html)).

#### Código del servidor

```c showLineNumbers
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#define SHMSZ 27

int main(){
  char c;
  int shmid;
  key_t key;
  char *shm, *s;

  /*Nombre del segmento de memoria compartida = "1234".*/
  key = 1234;

  /* Se crea el segmento de memoria*/
  if ((shmid = shmget(key, SHMSZ, IPC_CREAT | 0666)) < 0) {
    perror("shmget");
    exit(1);
  }

  /*El programa se adhiere (attach) al segmento ya creado */
  if ((shm = shmat(shmid, NULL, 0)) == (char *) -1) {
    perror("shmat");
    exit(1);
  }

  /* Se ponen algunos datos en el segmento para que el proceso cliente los lea */
  s = shm;
  for (c = 'a'; c <= 'z'; c++)
    *s++ = c;

  *s = NULL;

  /* Por último, se espera a que el proceso cliente cambie el primer caracter de la memoria compartida a '*' indicando que ya leyó la información */
  while (*shm != '*')
    sleep(1);
  
  shmdt(&shm);
  if (shmctl(&shmid, IPC_RMID, 0) == -1)  
 	  fprintf(stderr, "shmctl(IPC_RMID) error\n");
  else 
    printf(" Memoria liberada ");

  return(0);
}
```

#### Código del cliente

```c showLineNumbers
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <stdio.h>
#include <stdlib.h>
#define SHMSZ 27

void main() {
  int shmid;
  key_t key;
  char *shm, *s;

  /*Se requiere el segmento llamado "1234" creado por el servidor */
  key = 1234;

  /* Ubica el segmento */
  if ((shmid = shmget(key, SHMSZ, 0666)) < 0) {
    perror("shmget");
    exit(1);
  }

  /* Se adhiere al segmento para poder hacer uso de él */
  if ((shm = shmat(shmid, NULL, 0)) == (char *) -1) {
    perror("shmat");
    exit(1);
  }

  /* Lee lo que el servidor puso en la memoria */
  for (s = shm; *s != NULL; s++)
    putchar(*s);
      
  putchar('\n');

  /* Finalmente, cambia el calor del primer carácter indicando que ha leído el segmento */
  *shm = '*';

  shmdt(&shm);
  exit(0);
}
```

**Preguntas**
1. Consulte el uso de las funciones `shmget`, `shmat`, `shmdt` y `shmctl`. ¿Para qué sirven estas funciones? ¿Qué argumentos reciben y para qué sirven estos argumentos? ¿Cuál es la forma tradicional de usar estas funciones?
2. Analice el código anterior y verifique el uso y los parámetros pasados a las funciones mencionadas anteriormente.
3. Ejecute ambos programas, primero el servidor en una terminal y luego el cliente en otra terminal. ¿cómo es el funcionamiento del programa? ¿Qué sucede si ejecuta los programas en un orden diferente (cuál es la salida en pantalla)?
4. El flujo normal para el uso de memoria compartida entre procesos es solicitar la memoria compartida (`shmget`), adherirse a ella(`shmat`), usarla, luego des-adherirse (`shmdt`) y por último liberarla (`shmctl`). ¿Todos los procesos involucrados en la comunicación debe realizar este proceso? ¿Qué sucede si un proceso no realiza el proceso de des-adherirse antes de salir o si el proceso principal no libera la memoria antes de salir?

## 4. Creación y uso de semáforos con procesos

### 4.1. Semáforos con nombre

Estos semáforos son útiles para comunicar procesos que no tienen una relación directa, es decir, cuando los procesos son ejecutados de forma independiente, y para mantener la comunicación entre ellos es necesario declarar un nombre en el semáforo para que este pueda ser accedido por cualquier proceso. A continuación se presenta el código del problema del Productor/Consumidor.

#### Codigo del productor

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <semaphore.h>
#include <sched.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/wait.h>

#define BUFFER_SIZE 10    // tamaño del buffer
#define CICLOS 10 // numero de ciclos de ejecución

int buffer[BUFFER_SIZE];
sem_t *sem_cont, *sem_free; // declaramos un puntero para el identificador de los semaforos

int main (int argc, char *argv[]) {
 int i;
 pid_t hijo;
 int val;
 int entrada, salida;    // índices a las zonas de insercion y extraccion del buffer

 entrada = salida = 0; // inicializacion

 printf("Creando semaforos .....\n");

 /* comprueba si ya existe el semaforo del contador de productos sino lo crea inicializado(0)*/
 if((sem_cont = sem_open("/sem_cont", O_CREAT, 0644, 0)) == (sem_t *)-1) {
   perror("Error creando semaforo 1");
 }

 /* comprueba si ya existe el semaforo del espacio libre y sino lo crea inicializado (BUFFER_SIZE)*/
 if((sem_free = sem_open("/sem_free", O_CREAT, 0644, BUFFER_SIZE)) == (sem_t *)-1) {
   perror("Error creando semaforo 2");
 }

 printf("Creando proceso hijo .....\n");

 hijo = fork() ;

 if (hijo == -1) {
   printf("error creando proceso hijo\n");

   sem_unlink("/sem_cont");
   sem_unlink("/sem_free");

   exit(0);
 } else if (hijo == 0) {
   /*estamos en el padre-> productor */
   printf("Soy el padre (productor) con PID:%d\n", getpid());
   sleep(1);

   for (i = 0; i <= CICLOS; i++) {
     sem_wait(sem_free); /* espera que haya espacio en el buffer y decrementa */
     buffer[entrada] = i; // produce un elemento
     entrada = (entrada + 1) % BUFFER_SIZE; // buffer circular
     sem_post(sem_cont); /* incrementa el contador del semáforo */
     sem_getvalue(sem_cont, &val); // valor del contador del semáforo
     printf("Soy el Productor: entrada=%d, Estado %d productos\n", entrada, val);
     sleep(1);
   }

   /* libero semáforos */
   sem_close(sem_cont);
   sem_close(sem_free);

   exit(0);
 }

 printf("Soy el padre espero que termine el hijo .....\n");

 wait(0); /* Esperar que acabe el hijo */

 printf("Soy el padre destruyo los semaforos y termino.....\n");

 sem_unlink("/sem_cont");
 sem_unlink("/sem_free");

 exit(0);
}
```

#### Codigo del consumidor

```c showLineNumbers
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <semaphore.h>
#include <sched.h> 
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/wait.h>

#define BUFFER_SIZE 10    // tamaño del buffer
#define CICLOS 10 // numero de ciclos de ejecución

int buffer[BUFFER_SIZE];
sem_t *sem_cont, *sem_free; // declaramos un puntero para el identificador de los semaforos

int main (int argc, char *argv[]) {
 int i;
 pid_t hijo;
 int val;
 int entrada, salida;    // índices a las zonas de insercion y extraccion del buffer

 entrada = salida = 0; // inicializacion

 printf("Creando semaforos .....\n");

 /* comprueba si ya existe el semaforo del contador de productos sino lo crea inicializado(0)*/
 if((sem_cont = sem_open("/sem_cont", O_CREAT, 0644, 0)) == (sem_t *)-1) {
   perror("Error creando semaforo 1");
 }

 /* comprueba si ya existe el semaforo del espacio libre y sino lo crea inicializado (BUFFER_SIZE)*/
 if((sem_free = sem_open("/sem_free", O_CREAT, 0644, BUFFER_SIZE)) == (sem_t *)-1) {
   perror("Error creando semaforo 2");
 }

 printf("Creando proceso hijo .....\n");

 hijo = fork();

 if (hijo == -1) {
   printf("error creando proceso hijo\n");

   sem_close(sem_cont);
   sem_close(sem_free);
  
   exit(0);
 } else if (hijo == 0) {
   printf("Soy el hijo (consumidor) con PID:%d\n", getpid());
  
   sleep(1);

   for (i = 0; i <= CICLOS; i++) {
     sem_wait(sem_cont); /* espera que haya datos en el buffer (contador>0) y decrementa */
     buffer[salida] = 0; // consume un elemento
     salida= (salida+1) % BUFFER_SIZE; // buffer circular
     sem_post(sem_free); /* incrementa el contador de espacio */
     sem_getvalue(sem_cont, &val); // valor del contador del semáforo
     printf("Soy el Consumidor: salida=%d, Estado %d productos\n", salida, val); 
     sleep(2);
   }

   exit(0);
 }

 wait(0);

 /* libero semáforos */
 sem_close(sem_cont);
 sem_close(sem_free);

 printf("Soy el hijo y termino.....\n");

 exit(0);
}
```

### 4.2. Semáforos sin nombre
 
Estos semáforos son usados cuando se necesita comunicarse entre procesos creados por el mismo padre, por lo tanto no se requiere el uso de un nombre para ser accedido a ellos.

#### Ejemplo

```c 
#include <stdio.h>
#include <stdlib.h>
#include <semaphore.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <sys/stat.h>
#include <sys/mman.h>

#define NUMHIJOS 3

sem_t *sem1;

void s1();
void s2();
void s3();

int main(){
  int i;
  pid_t pid[NUMHIJOS];
  int val= 0;
  int    pid_hijo =0;

  sem1 = mmap(0, sizeof(sem_t), PROT_READ|PROT_WRITE, MAP_SHARED|MAP_ANONYMOUS, -1, 0);

  sem_init(sem1,1,0); //direccion de la variable, 0->hilos y diferente de 0->procesos, valor de inicializacion del semaforo.

  for (i = 0; i < NUMHIJOS; i++) {
     pid[i] = fork();//Crea los procesos y los guarda en un arreglo

     if (pid[i] == -1) {
        /* Verificacion de Error */
        printf("No fue posible crear un hijo\n");
        return -1;
     }

     if (pid[i] == 0) {
        //printf("\nSoy un proceso hijo con PID: %d!\n", getpid());
          switch (i){
           case 0:
              s3();
           break;

           case 1:
              s2();
           break;

           case 2:
              s1();
           break;
          }
        printf("El proceso hijo con PID %d ha terminado!\n", getpid());
        exit(0);
     }
  }

  for (i = 0; i < NUMHIJOS; i++) {
     wait(&val);
  }

  sem_destroy(sem1);

  printf("\nEl padre termino !!\n"); //mensaje al final
  return 0;
}

void s1(){
  printf("\nS1 Executing...\n");
  sem_post(sem1);
}

void s2(){
  sem_wait(sem1);//ejecuta primero el S1
  printf("\nS2 Executing...\n");
}

void s3(){
  printf("\nS3 Executing...\n");
}
```

## 5. Ejercicios propuestos

1. Realice la implementación del problema del barbero dormilón en usando solo semáforos.
2. Genere un deadlock o interbloqueo en el problema del productor consumidor con los semáforos.
3. **Medida de Dispersión**: el profesor de un curso desea un programa en lenguaje C que calcule la desviación estándar (símbolo **$\sigma$** o **$s$**) de las notas obtenidas por sus estudiantes en el curso.
   
   $$
   \overline{x}=\frac{1}{N}\sum_{i=1}^{N}x_{i}
   $$

   $$
   \sigma=\sqrt{\frac{1}{N-1}\sum_{i=1}^{N}(x_{i}-\overline{x})^2}
   $$

   **Requisitos**:
   1. El número de notas es variable (se debe usar memoria dinámica).
   2. El programa debe crear tantos hilos como se especifique en el parámetro de entrada `cantidad_hilos`, se debe ejecutar así: 
     
      ```
      $./nombre_ejecutable fichero_notas.csv
      ```

   3. El programa debe utilizar 2 hilos, uno que calcule el promedio y otro que calcule la desviación estándar
   4. Plantee una estrategia usando semáforos y/o mutex para asegurar primero se calcule el promedio antes de iniciar a calcular la desviación estándar. La creación de los hilos se debe realizar desde el main, todos deben de crearse sin ninguna restricción.

# 7. Referencias

1. https://bigdata-guide.blogspot.com/2014/01/what-is-race-condition.html
2. https://thesaurus.plus/thesaurus/race_condition
3. https://preshing.com/20150316/semaphores-are-surprisingly-versatile/
4. https://users.cs.cf.ac.uk/Dave.Marshall/C/node27.html
5. https://github.com/hailinzeng/Programming-POSIX-Threads
6. https://github.com/yesoun/Message-Passing-Threads
7. https://www.cs.helsinki.fi/u/kerola/rio/pdf/lu06_v.pdf
8. https://www.csl.mtu.edu/cs4411.choi/www/Resource/Semaphore.pdf
9. https://www.cs.princeton.edu/courses/archive/fall11/cos318/lectures/L8_SemaphoreMonitor_v2.pdf
10. http://www.csc.villanova.edu/~mdamian/threads/posixsem.html
11. https://cw.fel.cvut.cz/b241/courses/be5b33rpz/start
12. https://cw.fel.cvut.cz/b191/_media/courses/pag/cpp_threads_1.pdf
13. https://jvns.ca/teach-tech-with-cartoons/
14. https://www.cs.princeton.edu/courses/archive/fall11/cos318/
15. https://medium.com/geekculture/processes-threads-deadlock-semaphores-and-more-f70be5395ef6
16. https://www.csl.mtu.edu/cs4411.choi/www/
17. https://www.digikey.com/en/maker/projects/introduction-to-rtos-solution-to-part-7-freertos-semaphore-example/51aa8660524c4daba38cba7c2f5baba7