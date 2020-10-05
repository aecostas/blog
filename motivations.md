Estudié Ingeniería de Telecomunicación, en Vigo, entre 2001 y 2006. Debido a mi interés en el desarrollo de software, hice el Máster de Software Libre, impartido por Igalia.

En mis inicios trabajé muy cercano al software embebido pero más tarde descubrí que lo que me atraía era el desarrollo a más alto nivel. Trabajé en Quobis, empresa dedicada a comunicaciones de voz y video entre 2012 y 2017. Ahí fue donde empecé a trabajar con NodeJS. Nuestro foco eran las aplicaciones sobre WebRTC, una tecnología muy verde en ese momento lo cual nos trajo muchos quebraderos de cabeza, pero también nos posicionó como referentes en la misma. Gracias a eso la empresa creció de 12-13 empleados a cerca de 40 años en esos años. Mi rol inicial era desarrollador de software, convirtiéndome en Head of Development después del primer año. Llegamos a ser un grupo de 10 personas, conmigo como coordinador y contacto con el resto de departamentos, principalmente operaciones y board de dirección. 

Después de la etapa de Quobis, retomé mi lado más técnico trabajando como desarrollador para la empresa Anube, dedicada a la monitorización de pruebas deportivas. Se trata de una empresa pequeña, donde el equipo técnico somos solo tres ingenieros, uno para desarrollo de hardware, otro para firmware y yo para front y back. Sigo profundizando en NodeJS y en ReactJS para las interfaces. Una de las cuestiones diferenciales de este trabajo respecto a otros full-stack quizá sea el desarrollo de algoritmos para comprobar que los participantes en carreras cumplen la normativa. Para ello tuve que profundizar en cómo programar de manera eficiente y concurrente en NodeJS.

En cuanto a mi, soy una persona tranquila. Me gustan los ambientes "sanos" de trabajo, esto es, dónde se pueda preguntar abiertamente, dónde te sientas involucrado en el proyecto y no un mero recurso más, dónde no haya egos, etc. Me gusta mantenerme al día de la tecnología y me divierto leyendo un libro técnico en mi tiempo de ocio (los últimos: The pragmatic programmer book, Linux Shell Scripting Cookbook o Designing-data intensive applications), si bien me gusta ser pragmático y no caer en el error de usar la última tecnología/framework. En su lugar prefiero analizar el problema y evaluar cuál es la solución más sencilla. 

Como comentaba más arriba, he hecho un paso un poco a la inversa: pasé de coordinar un equipo de diez personas a ser desarrollador 100% en mi empresa actual. Lo que busco ahora es algo más cercano a lo segundo. Me encanta programar, pero no me importa en absoluto coordinar un pequeño equipo especialmente si son junior. De hecho, una actividad paralela que realizo actualmente es ser profesor del Bootcamp Hack-a-boss, donde imparto los módulos de Javascript y Backend. Lo que más me aporta esta experiencia es el trato con personas que están aprendiendo y que muestran ilusión por lo que hacen. A veces, cuando les resuelvo sus dudas, pero haciéndoles pensar, me siento como un mentor de un equipo más que un profesor y es muy realizante.







============================================

En lo técnico busco un trabajo donde seguir profundizando en el ecosistema NodeJS. No es que no esté abierto a otras tecnologías, sino que creo que se aporta más valor cuando se conoce en profundidad un conjunto de herramientas que cuando se conoce un poco de cada una. Lo segundo es importante para mantenerse al día y para empaparse de cómo se solucionan los problemas de otra manera; pero para resolver problemas prefiero lo primero.

Me gustaría que estuviera en una fase inicial, para poder enfrentarme a las decisiones y diseños iniciales y evaluar, con la perspectiva del tiempo, cómo de buenas o malas fueron esas decisiones. Me gustaría también que el equipo fuera pequeño, para conocer a todos, tener mayor visibilidad y, en definitiva, sentirme más involucrado.

Como comentaba en la sección anterior, busco un ambiente sano. Soy de los que está con stack-overflow abierto permanentemente en una pestaña del navegador por tanto espero que la empresa no busque un gurú, pero sí alguien con ganas de seguir aprendiendo y, si puedo, enseñar.

Busco full-remote. Vivo en Gondomar, un pueblo al sur de Vigo. Estar en un extremo de la península condiciona bastante los desplazamientos. Además, voy a ser padre, por segunda vez, en breve, y dos renacuajas merecen mucho tiempo.

La oferta de Goxo me parece que encaja bastante bien en esta descripción. Detallo a continuación mi experiencia en los puntos que se describen en la oferta:

   * Experiencia con RESTful APIs / Swagger (Open API) / Microservicios. Sí tengo experiencia con APIs REST, tanto creándolas como consumiéndolas. Recientemente tuve que implementar una API con ExpressJS, con JWT para autenticación y usando hapi/joi para validación de datos. Swagger lo conozco pero no lo he usado profesionalmente. Sí he implementado microservicios y por ello considero que son complejos y que conviene evaluar bien si realmente interesan. Como comentaba antes: primero estudiar el problema y después proponer la solución que mejor encaja. Los microservicios tienen puntos a favor (piezas de software autónomas y más pequeñas, los equipos escalan mejor, etc) y muchos problemas (comunicaciones por red son más lentas que las binarias, trazabilidad, gestión de errores, autorización de servicios, etc). Las arquitecturas de software es un tema que interesa mucho.

   * Creado múltiple backends y APIs, y desplegado en entornos contenerizados. En desarrollo de backends y API me siento cómodo. He hecho algo con Docker, pero poca cosa. Los aspectos más cercanos a sistemas/devops nunca han recaído en mi directamente.

   * Interesado en tecnologías de desarrollo basado en componentes como React.js (Redux, Sagas, Recompose, Reselect). Handlebars JS is a plus. Actualmente trabajo con ReactJs en el front. Me gusta mucho cómo se organizan las aplicaciones basadas en componentes porque te permite pensarlas como piezas de software autónomo que se comunican (con las props, con Redux, etc).

   * Haber tocado algo de desarrollo TDD y preocupado por la calidad del software con frameworks como Mocha, Jest o similar. He hecho TDD. Es verdad que no siempre, muchas veces hago tests a posteriori especialmente en las funcionalidades más algorítmicas donde no tengo claro el resultado a priori. He usado Mocha y, más recientemente, Jest. He dado formación sobre testing y TDD y tratar de inculcar sus beneficios especialmente en dos puntos: el poder realizar refactorizaciones asegurando que no rompe nada; y asegurar que la arquitectura de la aplicación es sencilla. Si es difícil de probar, es probable que la arquitectura sea mejorable (ej.: si hay que hacer muchos dobles quizá el código esté muy acoplado. Cuantas más funciones puras mejor)


   * Capacidad para integrar API de terceros como por ejemplo Facebook, Apple Sign in Stripe y otros. En mi paso Quobis teníamos que hacer muchas integraciones, pero no eran con servicios públicos cómo los descritos, sino más bien con APIs propietarias de la empresa que contratase nuestros servicios de videoconferencia, por ejemplo, bancos.

   * Ser permeable a la cultura devops, y de buenas prácticas del ciclo de vida del desarrollo de software (pipelines de CI/CD con Jenkins, CircleCi, o similar). Como comentaba más arriba, no soy experto. Sí he configurado alguna vez un Jenkins y un Heroku pero cosas simples. 

   * Deseable, conocimiento de sistemas operativos linux, git, redis, nginx, y algunos conceptos básicos de redes. Por mis inicios más cercanos a los embebidos y por la formación en Teleco, me gusta linux y cacharrear con comandos; Git lo uso desde hace años; con nginx he hecho alguna cosa, especialmente para guardar información de estado y cachés de aplicación y así tener servicios sin estado, minimizando problemas si se caen y simplificando el balanceo de carga; nginx lo conozco y configuré alguno súper básico, pero como comentaba, no soy experto en sistemas así que no es mi fuerte ahora mismo.
