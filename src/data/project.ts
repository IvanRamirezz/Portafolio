export const projects = [
{
id:"recicanje",

title:"Wireguard en Raspi 4",

description:"Red social sobre reciclaje",

image:`${import.meta.env.BASE_URL}/images/raspi.jpg`,

tags:["docker","mongodb","firebase"],

content:`
<h2>Wireguard en Raspi 4</h2>

<p>
Red social con CRUD, chat en tiempo real y autenticación.
</p>

<ul>
<li>MongoDB Atlas</li>
<li>Firebase Auth</li>
<li>Firestore realtime</li>
</ul>
`
},

{
id:"script",

title:"Oracle Script",

description:"Script OCI",

image:`${import.meta.env.BASE_URL}/images/python.png`,

tags:["python"],

content:`
<h2>Oracle Cloud Script</h2>

<p>
Automatiza creación de instancias free tier.
</p>
`
},

{
id:"vr-lab",
title:"Laboratorio VR de Redes Ópticas",
description:"Simulador educativo",
image:"/images/vr.png",
tags:["unity","vr","supabase"]
},

{
id:"vr-lab",
title:"Laboratorio VR de Redes Ópticas",
description:"Simulador educativo",
image:"/images/vr.png",
tags:["unity","vr","supabase"]
}



];