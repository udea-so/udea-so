#include <stdlib.h>

int main() {
  int *p, i, a;
  p = malloc(10*sizeof(int));
  p[11] = 1; /* invalid write error */
  a = p[11]; /* invalid read error */
  free(p);
  return 0;
}