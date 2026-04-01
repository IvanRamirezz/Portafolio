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
},

{
id:"app-script",
title:"Data Cleaning con Apps Script",
description:"Automatización de limpieza y validación de datos desde Google Forms, generando archivos CSV para el registro masivo de estudiantes en plataforma educativa.",
image:`${import.meta.env.BASE_URL}/images/Appscrit.png`,
tags:["javascript","google sheet","csv"]
},

{
id:"Axoloop",
title:"AxoLoop",
description:"App móvil para gestionar suscripciones y tarjetas de crédito, con seguimiento de fechas de corte, recordatorios y visualización de pagos recurrentes.",
image:`${import.meta.env.BASE_URL}/images/AppIcon.png`,
tags:["swift","android studio","finance"]
}
];