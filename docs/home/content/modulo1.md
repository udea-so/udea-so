---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Módulo 1: Virtualización de CPU

## 1. Introducción a los sistemas Operativos

En esta semana vamos a explorar los elementos básicos de un Sistema Operativo ¿Qué es? ¿Cómo se compone? ¿Para qué sirve?

### Clase 1 - Introducción a los sistemas operativos

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=DH02-_tvRFYkn5KL&amp;list=PLlTZ99qnw3zKBiKz7pZ_ErH3AR3rpaaKT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSy8d6gb0Ej2FlY7IWZBuSxON_jP4DzpD76dAgCpvBwZOTC0MFWsSI2DBoxiOqxaQY5oXwaynFKe5hx/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 1**: A Dialogue on the Book [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-threeeasy.pdf)
  * **Capítulo 2**: Introduction to Operating Systems [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf)

  #### Código 

  * **Código - cápitulo 1** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/intro)
  
</details>


## 2. Procesos

En esta semana conoceremos el concepto de procesos y entenderemos cómo hace el sistema operativo para implementar de forma segura y eficiente esta importante abstracción en los computadores modernos.

### Clase 2 - Procesos

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=sPI7rVCPYNU60xPT&amp;list=PLlTZ99qnw3zJRn69WubeN6zhBNlVHlVzx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT9Z0H2_t2mgzEJ2F4jnmFmJCdDpQeNkGlNz96XHZPmioJDDhunbf1Wz2Bgr1nIN8-FrD_CZn8HtqSr/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>  
  </p>

  #### Texto guia

  * **Capítulo 3**: Part I - Virtualization [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-virtualization.pdf)
  * **Capítulo 4**: The Abstraction: The Process [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf)

  #### Código 

  * **Capítulo 5**: Interlude: Process API [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf)
  * **Código - cápitulo 5** [[repo]](https://github.com/remzi-arpacidusseau/ostep-code/tree/master/intro)
  
</details>

### Clase 3 - Ejecución directa limitada

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=Qeld0HjeM53deG6V&amp;list=PLlTZ99qnw3zK0T4115PylykVzQGlmu7tT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSAyUf6OE3w0ji_hPaf4hCzrC1_xLO3dXZi_uGVDO7dHyeE0JA5M2oKk4nKfx3R-n2TP29_YgHetsDj/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>  
  </p>

  #### Texto guia

  * **Capítulo 6**: Mechanism: Limited Direct Execution [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf)
    
</details>

## 3. Planificación de Procesos

¿Cómo se ejecutan centenares de procesos simultáneamente en un computador? El scheduler del sistema operativo es el encargado de decidir en qué orden se ejecutarán los procesos, esta semana vamos a explorar este importante módulo comprendiendo su importancia en el desempeño de un sistema de cómputo.

### Clase 4 - Planificación de procesos

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=N8HESEUIa8q1BmZe&amp;list=PLlTZ99qnw3zJI_gchXlzOenG6uBDqa0Je" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>


<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT-HsJAlIYxl6r96Nes70z1YT3fRNlrD6k4un7fqZwGjp15tuo32Tc252tq-CM-ZBLbt3PQU_G7qM1O/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe> 
  </p>

  #### Texto guia

  * **Capítulo 7**: Scheduling: Introduction [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf)
    
</details>


### Clase 5 - Multi-Level Feedback Queue

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=k0NU8eaw01o0S_QQ&amp;list=PLlTZ99qnw3zIU86Ev83CTucnZId9LpQLi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>


<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRLhl5tf81TvUbVVWb5xIN9-kOo3SaH94b0y8vM-RKc0WJD17xGHsdb0l4xINkxnRM8qSODiniXKAAG/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 8**: Scheduling: The Multi-Level Feedback Queue [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
  * **Capítulo 11**: Summary Dialogue on CPU Virtualization [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf)
    
</details>
