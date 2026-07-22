export const projects = [
{
id:"wireguard",
title:"VPN con Wireguard en Raspi 4",
description:"Configuración de una VPN utilizando WireGuard en Raspberry Pi 4 para acceso remoto seguro a servicios y red privada.",
image:`${import.meta.env.BASE_URL}/images/raspi.jpg`,
tags:["docker","linux","vpn","raspberrypi"],
},

{
id:"nextcloud",
title:"Nube privada con Nextcloud",
description:"Servidor de nube privada con Nextcloud en Raspberry Pi utilizando Docker para almacenamiento y sincronización segura de archivos.",
image:`${import.meta.env.BASE_URL}/images/nextcloud.jpg`,
tags:["docker","linux","cloud","networking"],
},

{
id:"LabVR",
title:"Laboratorio RV de Redes Ópticas",
description:"Simulador en realidad virtual para el aprendizaje de dispersión y atenuación en fibras ópticas.",
image:`${import.meta.env.BASE_URL}/images/Logo.png`,
tags:["unity","sql","astro","supabase"],
url:"https://dashboard-web-six-umber.vercel.app",
},

{
id:"app-script",
title:"Data Cleaning con Apps Script",
description:"Automatización de limpieza y validación de datos desde Google Forms, generando archivos CSV para el registro masivo de estudiantes en plataforma educativa.",
image:`${import.meta.env.BASE_URL}/images/Appscrit.png`,
tags:["javascript","google sheet","csv"]
},

{
id:"neocodes",
title:"NeoCodes — Tienda de códigos digitales",
description:"Tienda de códigos digitales desarrollada como freelance, conectada a un bot de Telegram para automatizar ventas y con panel administrativo para subir juegos y administrar el sitio.",
image:`${import.meta.env.BASE_URL}/images/neocodes.png`,
tags:["freelance","ecommerce","telegram-bot","admin-panel"],
url:"https://family-manager-eight.vercel.app/tienda",
},

{
id:"actipulse",
title:"Actipulse Neuroscience",
description:"Sitio web corporativo de Actipulse Neuroscience, desarrollado durante mi práctica profesional como Web Development Intern.",
image:`${import.meta.env.BASE_URL}/images/actipulse.png`,
tags:["astro","css","tailwind"],
url:"https://actipulse.com",
}
];