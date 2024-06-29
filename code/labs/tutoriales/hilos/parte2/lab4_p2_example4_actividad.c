#include<stdio.h>
#include<stdlib.h>
#include<pthread.h>
#include<semaphore.h>
#define NUMTHREADS 3

sem_t synch1;
sem_t synch2;
int val;
void *s1(void *arg);
void *s2(void *arg);
void *s3(void *arg);

int main(){
  int i;
  pthread_t tid[NUMTHREADS];
  sem_init(&synch1,0,0);
  sem_init(&synch2,0,0);
  pthread_create(&tid[0],NULL,&s3,NULL);
  pthread_create(&tid[1],NULL,&s2,NULL);
  pthread_create(&tid[2],NULL,&s1,NULL);

  for( i=0; i< NUMTHREADS; i++){
     pthread_join(tid[i], NULL);
  }

  sem_destroy(&synch1);
  sem_destroy(&synch2);
  printf("\nDone !!\n");

  return 0;
}

void *s1(void *arg){
  printf("\nS1 Executing...\n");
  sem_post(&synch1);
  return 0;
}

void *s2(void *arg){
  sem_wait(&synch1);
  printf("\nS2 Waiting...\n");
  printf("\nS2 Executing...\n");
  sem_post(&synch2);
  return 0;
}

void *s3(void *arg){
  sem_wait(&synch2);
  printf("\nS3 Executing...\n");
  return 0;
}
