---
sidebar_position: 2
---

# Módulo 2: Virtualización de Memoria


## 1. Virtualización de Memoria y paginación

Ya hemos explorado cómo hace el Sistema Operativo para gestionar la CPU. Ahora vamos a tratar otro de los principales elementos del sistema de cómputo: la memoria principal.

### Clase 6 - Virtualización de memoria

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=8BDlJPHAmY46-TD-&amp;list=PLlTZ99qnw3zKMsdok4wLn_e-zj8PPU-fp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSLr8YzZOUv9gpsn4vBADxO9Um6vhBfH1lpwnZ5OYmKuLwkpjuVcI762Xq7Q_-sVbZ0-2SYEJZh9wsw/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 12**: A Dialogue on Memory Virtualization [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-vm.pdf)
  * **Capítulo 13**: The Abstraction: Address Spaces [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf)

  #### Código 

  * **Código - cápitulo 13** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/vm-intro)
  
</details>

### Clase 7 - Segmentación

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=dNopNXGAkxyd6zHq&amp;list=PLlTZ99qnw3zI156DnFfGHG8ye4dWE1UyJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vS0qBN5Eo-nGy0VWdSuHLmvoyvkuQKcgLErz5gHga8uByZuundqRVi7V_w15tx8HklQ04B5ovy6f9x8/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 14**: Segmentation [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf)

</details>


### Clase 8 - Paginación

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=ScdMpFSsX2kEVXro&amp;list=PLlTZ99qnw3zI8upvQZoUc4vuQcT5cVd0I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQuUYBMVjI-XDqssW9ANf_-W9Id7CXo7lPPkGKub9Uiv2bb_ARfIs66cVDQmUmAfxeFl3OMQV_pr37A/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 15**: Paging: Introduction [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf)
    
</details>


## 2. TLB y mecanismos

Esta semana comprenderemos como una pequeña memoria caché "la TLB" permite mejorar el desempeño de la paginación y hace que podamos tener esta técnica de virtualización de memoria en los sistemas modernos. Adicionalmente, vamos a abordar el problema de la tablas de página muy grandes y a explorar algunas técnicas que se han propuesto para su solución.

### Clase 9 - TLB - Multinivel

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=V3wJuWMB-7eU1GiY&amp;list=PLlTZ99qnw3zI2XxQqse_JM0NY2VSdxLP9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRuSNw8PZ4GNU7bdfE0IJ6T4AOlZn-i1SBs7_POjZ8yNttfN95rZVuSLCxfwp9gnbg-2RgRiWxVtIuK/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 19**: Paging: Faster Translations (TLBs) [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf)
  * **Capítulo 20**: Paging: Smaller Tables [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf)
    
</details>


### Clase 10 - Espacio Swap

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=OHc-f0JzdFCKKyfX&amp;list=PLlTZ99qnw3zL4G_QZH9vVb_3UzZyoQZDU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSk2Aa_eR0OI4Ni_SXU7JuiAM6Yf6s76ybJ5DGxYpQTBYVq2Bup6mGKwKhGbIxNCeF2BX0gHgZBnt0N/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 21**: Beyond Physical Memory: Mechanisms [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf)
    
</details>




## 3. Políticas

La gestión de memoria empieza a tener forma, sin embargo hay algunos detalles que deben ser solucionados para sacar el máximo rendimiento de la máquina.  ¿Cómo ejecutar un proceso con una imagen de memoria más grande que la memoria física disponible? Esta semana vamos a explorar estos y otros detalles del sistema de memoria que permiten que te despreocupes como programador de la gestión de memoria en el computador.

### Clase 11 - Políticas

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=TDurlHFAIgyvpF6f&amp;list=PLlTZ99qnw3zLKxI5vy8JuSZRHn9pR8G8P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>


<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSdX0I9UGEHXZuz-F-IuBDbs_mHjygC6kc09FGbq6RTfSNHtij2-aQiSa0W04B0xNJsEfa6LjH2j2U1/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 22**: Beyond Physical Memory: Policies [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf)
  * **Capítulo 23**: Summary Dialogue on Memory Virtualization [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-dialogue.pdf)
    
</details>

