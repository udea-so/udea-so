---
sidebar_position: 4
---

# Módulo 4: Persistencia

## 1. Dispositivos de Entrada Salida y Discos Duros

Hacer persistente la información que procesamos en un computador requiere la asistencia de algunos módulos del Sistema Operativo. Los elementos del sistema de cómputo donde podemos persistir la información son vistos usualmente como dispositivos de entrada salida (Discos duros, memorias flash, unidades de estado sólido, etc.), por eso, esta semana, vamos a explorar los dispositivos de entrada salida en general, para luego abordar los detalles en el funcionamiento de los discos duros.

### Clase 18 - Dispositivos de Entrada Salida

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=aGkDkrKTnJryOcEW&amp;list=PLlTZ99qnw3zI9gQ4H6mnop3-0BTxo1UDm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQigXP6ph13Nx98d_OCI-WOBxEC4SqfTP-rxmSQSyIsvnDzJQiP1i2WEa8w8Lw7UFNKq-hDZ_Z1FmYC/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 35**: Part III - Persistence [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-persistence.pdf)
  * **Capítulo 36**: I/O Devices [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf)
    
</details>

### Clase 19 - Discos Duros

<p align="center">
Video no disponible :poop:
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSe2zzZSAVOomwTuhRdgTP1ZqXrtbksY9g3Y_34jMEq5S_WSvvoFk-3lPD4PVHHSsIPv24OPxBK38er/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 37**: Hard Disk Drives [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf)
    
</details>

## 2. RAID y Interfaz de los Sistemas de Archivos

Esta semana vamos a explorar dos temas muy importantes de la persistencia: RAID y los sistemas de archivos. 

### Clase 20 - RAID

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=o3y1jb0MHT081vDc&amp;list=PLlTZ99qnw3zI89p5Xujpax_9ZvY43s58S" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTdf4qs01o1lkCWzVHLPzWG1TXVl46aaRjbRHd66lkH4SNgzkAuAVwqp1vbu_9NWUNYUG9NAdRv75jL/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 38**: Redundant Arrays of Inexpensive Disks (RAIDs) [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf)

</details>

### Clase 21 - Archivos y directorios

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=HhR6aBKGfkh2bZNf&amp;list=PLlTZ99qnw3zLyrJCAzMSep6TH0_w5M29K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQHLvbz-VBylB-2yY9KC36KMhfJFAI6MfhAiPaoNM0EYRuTQtfhXR_6ugkmSw-p-NXv_ob5I10u5QOs/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 39**: Interlude: Files and Directories [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf)
  
</details>

## 3. Implementación de Sistemas de Archivos

Esta semana vamos a conocer otras dos técnicas para solucionar los problemas de la concurrencia: Variables de Condición y Semáforos.

### Clase 22 - Sistema de Archivos: Implementación

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=daI8V-l-ToItKLfh&amp;list=PLlTZ99qnw3zI9UQJusHqBrfGTpVRfL8qT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQLwm8DVbYbELDTYRZKUK7u047DIOAKYOf0dwHQh6LZMdROjQtGMYwbuNzKqs_ihUst3iQPPSOLn2lF/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 40**: File System Implementation [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf)
  
</details>

### Clase 23 - Fast File System

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=FXdH4nMIQ8MqHQ3G&amp;list=PLlTZ99qnw3zLoj96ZGH268RRuh7Wqvdd0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSJrlall6Q0tcFhMLAvEjN1Zn4SxuR9US2RCi6ph0af-Z4ztLI69taCh8tMtcM3u8wbXjJEs1sLeaig/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 41**: Locality and The Fast File System [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf)
      
</details>

## 4. Consistencia y SSDs.

Esta semana vamos a conocer otras dos técnicas para solucionar los problemas de la concurrencia: Variables de Condición y Semáforos.

### Clase 24 - Fsck Journaling

#### Clase 24 - Parte 1

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=sdZ1fF6Id5zkHMGU&amp;list=PLlTZ99qnw3zJEGflW2K0mA7HtFB_cZ3LZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

#### Clase 24 - Parte 2

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?si=2Vj3gdi23DZ4p1PB&amp;list=PLlTZ99qnw3zJNCRW6pYT-EKDlyJOcCNCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQzLBnoCT3BoNH_gc_WvFqUuNB52lt9ITbF9jwKXrGppKl3SRZu4bDqLIxM0uhayhVa7Rb0QKCY_4V7/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 42**: Crash Consistency: FSCK and Journaling [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf)
      
</details>

### Clase 25 - SSDs

<p align="center">
Video no disponible :poop:
</p>

<details>
  <summary>**Material de apoyo**</summary>
  #### Presentaciones 

  <p align="center">
  <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRDULHqQJjoC0LB8lB0eiQyrQ-I5r_Pmfn858_piQRYIDrvrvJqoOzmGG8_ldii0mZPw7W1G1P5pBWt/embed?start=false&loop=false&delayms=3000" frameborder="0" width="480" height="299" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  </p>

  #### Texto guia

  * **Capítulo 44**: Flash-based SSDs [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf)
  * **Capítulo 46**: Summary Dialogue on Persistence [[link]](https://pages.cs.wisc.edu/~remzi/OSTEP/file-dialogue.pdf)
    
</details>
