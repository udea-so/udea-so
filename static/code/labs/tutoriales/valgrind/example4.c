#include <stdlib.h>
#include <unistd.h>

int main() {
  int *p;
  p = malloc(10);
  read(0, p, 100); /* Error: unaddressable bytes */
  free(p);
  return 0;
}