---
sidebar_position: 3
---

# Módulo 3: Concurrencia

## 1. Concurrencia

¿Te has preguntado cómo una aplicación de procesamiento de texto (Open Office, Word, etc.) puede recibir información por el teclado y de manera simultánea verificar la gramática y ortografía de lo que escribes? La concurrencia es una característica esencial en las aplicaciones modernas, genera múltiples beneficios, pero también grandes desafíos a los programadores. Esta semana descubrirás cómo hace el sistema operativo para soportar la concurrencia y explorarás algunos de los desafíos en su implementación.


### Clase 12 - Concurrencia

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=ogmWgw-HtrSm7DvR&amp;list=PLlTZ99qnw3zLTv0gby0YT3_F1JuRjBM_x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQkYnTKfb7Rz7AIvHE_HiFVllZIC02M-FIS_hyxwHxtEJWp7Whb_LjoYmeN6GK_HVUcM0BrInx7cdVW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 25**: Part II - Concurrency [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-vm.pdf)
  * **Capítulo 26**: Concurrency: An Introduction [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf)

  #### Código 

  * **Código - cápitulo 26** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-intro)
  * **Capítulo 27**: Interlude: Thread API [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf)
  * **Código - cápitulo 27** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-api)
    
</details>

## 2. Locks

El problema de las condiciones de carrera es un verdadero dolor de cabeza en el desarrollo de software. Esta semana vamos a explorar una de las técnicas mas importantes para darle solución a este problema, los Locks.

### Clase 13 - Locks

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=vkICn20nrLSD3u34&amp;list=PLlTZ99qnw3zLg6YP6nqKkKduMZfWrJN1o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTNGJ-0CmEkFoEShOJ9QU1h190GBNKfFwP3n0oMAi8F2JLeV1bDjy8b1zanyzGQtq4t7AlrLUoAyuEy/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 28**: Locks [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf)
  
  #### Código 

  * **Código - cápitulo 28** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-locks)

</details>

### Clase 14 - Estructuras de datos basadas en Locks

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=Ye0Dn9QhxnOiKucZ&amp;list=PLlTZ99qnw3zK0ulqmazBNmpQvTeW2_L_p" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRi709dI8amkBkPPxDD3MfABQF3MtmTDZum70oTgZPl3FPQtvRPxYecd92wfcF0wBQ00Vr1eh_88NY6/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 29**: Lock-based Concurrent Data Structures [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf)
  
</details>

## 3. Variables de Condición y Semáforos

Esta semana vamos a conocer otras dos técnicas para solucionar los problemas de la concurrencia: Variables de Condición y Semáforos.

### Clase 15 - Variables de condición y semaforos

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=5e_mh74NP59-57N2&amp;list=PLlTZ99qnw3zLn37QZ4AYezHSjpMxp7lci" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRM7Y81YY8Ci6RvCoefej9CEWxGeUR6xHJpVCQg1-VdV99So62gjrv9Xf9WxVUsTAkRqyZOBkYfTprP/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 30**: Condition Variables [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf)
  
  #### Código 

  * **Código - cápitulo 30** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-cv)    
    
</details>


### Clase 16 - Semáforos

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=0ae9QQeOkI8r64vl&amp;list=PLlTZ99qnw3zIOigZ-JTwX-9qGI-BI8BR9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQaXhyWWol2AtIlQvZg_yFH6NzR4Bt5033AnU4pmpfUn9lIDIfbCiS5KV3kThIp-T0Ldr7UxmiEmozv/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 31**: Semaphores [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf)
  
  #### Código 

  * **Código - cápitulo 31** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/threads-sema)
    
</details>

## 4. Problemas de concurrencia

Esta semana vamos a conocer otras dos técnicas para solucionar los problemas de la concurrencia: Variables de Condición y Semáforos.


### Clase 17 - Problemas de concurrencia

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=d-YgsRa581rZiJbU&amp;list=PLlTZ99qnw3zI3hhEjgrCCwtydve2I3cnG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRAufK3DABWxMjgkw5JttUo0gCkXYOfzbFzRlgYYils1JKEiFTsFTeprHKJ9h0SM-BGvyyn_TJbOMMW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 32**: Common Concurrency Problems [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf)
    
</details>
