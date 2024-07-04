"use strict";(self.webpackChunkudea_so=self.webpackChunkudea_so||[]).push([[9118],{4819:(e,i,r)=>{r.r(i),r.d(i,{assets:()=>t,contentTitle:()=>n,default:()=>u,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=r(4848),l=r(8453);const a={sidebar_position:2},n="M\xf3dulo 2: Virtualizaci\xf3n de Memoria",o={id:"teoria/content/modulo2",title:"M\xf3dulo 2: Virtualizaci\xf3n de Memoria",description:"1. Virtualizaci\xf3n de Memoria y paginaci\xf3n",source:"@site/docs/teoria/content/modulo2.md",sourceDirName:"teoria/content",slug:"/teoria/content/modulo2",permalink:"/udea-so/docs/teoria/content/modulo2",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"teoriaSidebar",previous:{title:"M\xf3dulo 1: Virtualizaci\xf3n de CPU",permalink:"/udea-so/docs/teoria/content/modulo1"},next:{title:"M\xf3dulo 3: Concurrencia",permalink:"/udea-so/docs/teoria/content/modulo3"}},t={},c=[{value:"1. Virtualizaci\xf3n de Memoria y paginaci\xf3n",id:"1-virtualizaci\xf3n-de-memoria-y-paginaci\xf3n",level:2},{value:"Clase 6 - Virtualizaci\xf3n de memoria",id:"clase-6---virtualizaci\xf3n-de-memoria",level:3},{value:"Presentaciones",id:"presentaciones",level:4},{value:"Texto guia",id:"texto-guia",level:4},{value:"C\xf3digo",id:"c\xf3digo",level:4},{value:"Clase 7 - Segmentaci\xf3n",id:"clase-7---segmentaci\xf3n",level:3},{value:"Presentaciones",id:"presentaciones-1",level:4},{value:"Texto guia",id:"texto-guia-1",level:4},{value:"Clase 8 - Paginaci\xf3n",id:"clase-8---paginaci\xf3n",level:3},{value:"Presentaciones",id:"presentaciones-2",level:4},{value:"Texto guia",id:"texto-guia-2",level:4},{value:"2. TLB y mecanismos",id:"2-tlb-y-mecanismos",level:2},{value:"Clase 9 - TLB - Multinivel",id:"clase-9---tlb---multinivel",level:3},{value:"Presentaciones",id:"presentaciones-3",level:4},{value:"Texto guia",id:"texto-guia-3",level:4},{value:"Clase 10 - Espacio Swap",id:"clase-10---espacio-swap",level:3},{value:"Presentaciones",id:"presentaciones-4",level:4},{value:"Texto guia",id:"texto-guia-4",level:4},{value:"3. Pol\xedticas",id:"3-pol\xedticas",level:2},{value:"Clase 11 - Pol\xedticas",id:"clase-11---pol\xedticas",level:3},{value:"Presentaciones",id:"presentaciones-5",level:4},{value:"Texto guia",id:"texto-guia-5",level:4}];function d(e){const i={a:"a",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...(0,l.R)(),...e.components},{Details:r}=i;return r||function(e,i){throw new Error("Expected "+(i?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.h1,{id:"m\xf3dulo-2-virtualizaci\xf3n-de-memoria",children:"M\xf3dulo 2: Virtualizaci\xf3n de Memoria"}),"\n",(0,s.jsx)(i.h2,{id:"1-virtualizaci\xf3n-de-memoria-y-paginaci\xf3n",children:"1. Virtualizaci\xf3n de Memoria y paginaci\xf3n"}),"\n",(0,s.jsx)(i.p,{children:"Ya hemos explorado c\xf3mo hace el Sistema Operativo para gestionar la CPU. Ahora vamos a tratar otro de los principales elementos del sistema de c\xf3mputo: la memoria principal."}),"\n",(0,s.jsx)(i.h3,{id:"clase-6---virtualizaci\xf3n-de-memoria",children:"Clase 6 - Virtualizaci\xf3n de memoria"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=8BDlJPHAmY46-TD-&list=PLlTZ99qnw3zKMsdok4wLn_e-zj8PPU-fp",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vSLr8YzZOUv9gpsn4vBADxO9Um6vhBfH1lpwnZ5OYmKuLwkpjuVcI762Xq7Q_-sVbZ0-2SYEJZh9wsw/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 12"}),": A Dialogue on Memory Virtualization ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/dialogue-vm.pdf",children:"[link]"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 13"}),": The Abstraction: Address Spaces ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf",children:"[link]"})]}),"\n"]}),(0,s.jsx)(i.h4,{id:"c\xf3digo",children:"C\xf3digo"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"C\xf3digo - c\xe1pitulo 13"})," ",(0,s.jsx)(i.a,{href:"https://github.com/remzi-arpacidusseau/ostep-code/tree/master/vm-intro",children:"[repo]"})]}),"\n"]})]}),"\n",(0,s.jsx)(i.h3,{id:"clase-7---segmentaci\xf3n",children:"Clase 7 - Segmentaci\xf3n"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=dNopNXGAkxyd6zHq&list=PLlTZ99qnw3zI156DnFfGHG8ye4dWE1UyJ",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones-1",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vS0qBN5Eo-nGy0VWdSuHLmvoyvkuQKcgLErz5gHga8uByZuundqRVi7V_w15tx8HklQ04B5ovy6f9x8/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia-1",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 14"}),": Segmentation ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf",children:"[link]"})]}),"\n"]})]}),"\n",(0,s.jsx)(i.h3,{id:"clase-8---paginaci\xf3n",children:"Clase 8 - Paginaci\xf3n"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=ScdMpFSsX2kEVXro&list=PLlTZ99qnw3zI8upvQZoUc4vuQcT5cVd0I",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones-2",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vQuUYBMVjI-XDqssW9ANf_-W9Id7CXo7lPPkGKub9Uiv2bb_ARfIs66cVDQmUmAfxeFl3OMQV_pr37A/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia-2",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 15"}),": Paging: Introduction ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf",children:"[link]"})]}),"\n"]})]}),"\n",(0,s.jsx)(i.h2,{id:"2-tlb-y-mecanismos",children:"2. TLB y mecanismos"}),"\n",(0,s.jsx)(i.p,{children:'Esta semana comprenderemos como una peque\xf1a memoria cach\xe9 "la TLB" permite mejorar el desempe\xf1o de la paginaci\xf3n y hace que podamos tener esta t\xe9cnica de virtualizaci\xf3n de memoria en los sistemas modernos. Adicionalmente, vamos a abordar el problema de la tablas de p\xe1gina muy grandes y a explorar algunas t\xe9cnicas que se han propuesto para su soluci\xf3n.'}),"\n",(0,s.jsx)(i.h3,{id:"clase-9---tlb---multinivel",children:"Clase 9 - TLB - Multinivel"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=V3wJuWMB-7eU1GiY&list=PLlTZ99qnw3zI2XxQqse_JM0NY2VSdxLP9",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones-3",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vRuSNw8PZ4GNU7bdfE0IJ6T4AOlZn-i1SBs7_POjZ8yNttfN95rZVuSLCxfwp9gnbg-2RgRiWxVtIuK/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia-3",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 19"}),": Paging: Faster Translations (TLBs) ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf",children:"[link]"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 20"}),": Paging: Smaller Tables ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf",children:"[link]"})]}),"\n"]})]}),"\n",(0,s.jsx)(i.h3,{id:"clase-10---espacio-swap",children:"Clase 10 - Espacio Swap"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=OHc-f0JzdFCKKyfX&list=PLlTZ99qnw3zL4G_QZH9vVb_3UzZyoQZDU",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones-4",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vSk2Aa_eR0OI4Ni_SXU7JuiAM6Yf6s76ybJ5DGxYpQTBYVq2Bup6mGKwKhGbIxNCeF2BX0gHgZBnt0N/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia-4",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 21"}),": Beyond Physical Memory: Mechanisms ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf",children:"[link]"})]}),"\n"]})]}),"\n",(0,s.jsx)(i.h2,{id:"3-pol\xedticas",children:"3. Pol\xedticas"}),"\n",(0,s.jsx)(i.p,{children:"La gesti\xf3n de memoria empieza a tener forma, sin embargo hay algunos detalles que deben ser solucionados para sacar el m\xe1ximo rendimiento de la m\xe1quina.  \xbfC\xf3mo ejecutar un proceso con una imagen de memoria m\xe1s grande que la memoria f\xedsica disponible? Esta semana vamos a explorar estos y otros detalles del sistema de memoria que permiten que te despreocupes como programador de la gesti\xf3n de memoria en el computador."}),"\n",(0,s.jsx)(i.h3,{id:"clase-11---pol\xedticas",children:"Clase 11 - Pol\xedticas"}),"\n",(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/videoseries?si=TDurlHFAIgyvpF6f&list=PLlTZ99qnw3zLKxI5vy8JuSZRHn9pR8G8P",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:!0})}),"\n",(0,s.jsxs)(r,{children:[(0,s.jsx)("summary",{children:(0,s.jsx)(i.strong,{children:"Material de apoyo"})}),(0,s.jsx)(i.h4,{id:"presentaciones-5",children:"Presentaciones"}),(0,s.jsx)("p",{align:"center",children:(0,s.jsx)("iframe",{src:"https://docs.google.com/presentation/d/e/2PACX-1vSdX0I9UGEHXZuz-F-IuBDbs_mHjygC6kc09FGbq6RTfSNHtij2-aQiSa0W04B0xNJsEfa6LjH2j2U1/embed?start=false&loop=false&delayms=3000",frameborder:"0",width:"480",height:"299",allowfullscreen:"true",mozallowfullscreen:"true",webkitallowfullscreen:"true"})}),(0,s.jsx)(i.h4,{id:"texto-guia-5",children:"Texto guia"}),(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 22"}),": Beyond Physical Memory: Policies ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf",children:"[link]"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Cap\xedtulo 23"}),": Summary Dialogue on Memory Virtualization ",(0,s.jsx)(i.a,{href:"https://pages.cs.wisc.edu/~remzi/OSTEP/vm-dialogue.pdf",children:"[link]"})]}),"\n"]})]})]})}function u(e={}){const{wrapper:i}={...(0,l.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,i,r)=>{r.d(i,{R:()=>n,x:()=>o});var s=r(6540);const l={},a=s.createContext(l);function n(e){const i=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:n(e.components),s.createElement(a.Provider,{value:i},e.children)}}}]);