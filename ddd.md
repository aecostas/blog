Books:
    * Implementeing ddd
    * ddd destilled (más recomendado)
    * https://www.infoq.com/minibooks/domain-driven-design-quickly


DDD No es un patrón, sino una metodología de desarrollo

Diseño estratégico
    * poner en contacto business e ingeniería con el objetivo de que hablen el mismo idioma
    * ubiquitous language: 
    * Domain model
    * bounded context: partes más granulares del dominio


DDD -> primero escribir los procesos (cómo se almacenan en BBDD es secundario)


Cómo encajan los microservicios en DDD? Propoercionan una barrera natural para el bounded context, ya que cada
microservicio debe tener una API

carpetas de código:
  * dominio
  * aplicación
  * infraestructura

ValueObjects -> Ej.: class Email con comprobación de que es un email correcto?




node-> top level away?