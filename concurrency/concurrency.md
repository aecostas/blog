En los últimos meses he estado involucrado en una aplicación bastante intensiva en uso de recursos, de ahí mis posts anteriores sobre rendimiento. Ahí hablaba de cómo evaluar el tiempo de ejecución e incluso de cómo mejorarlo gracias al uso de algoritmos y estructuras de datos adecuados, solución muchas veces más conveniente que reimplementar en un lenguaje más rápido.

Además, he tenido que valorar la ejecución paralela de algunas partes del sistema. Para ello barajé distintas posibilidades: **clúster**, **microservicios** o hilos de ejecución (**workers** en NodeJS).

Cuando escalamos un sistema con un **cluster** replicamos nuestro proceso tantas veces como nos haga falta. De esta forma las peticiones entrantes, recibidas por ejemplo mediante una API REST, serán atendidas por instancias distintas. Como cada una se ejecuta de manera con una CPU distinta, se pueden ejecutar en paralelo, reduciendo así el tiempo de espera de cada petición.

TODO: fórmula de tiempo de ejecución?

Con este tipo de solución es importante que cada petición se pueda ejecutar de manera independiente de las demás, es decir, no debe ser necesario que todas las peticiones de una misma sesión sean procesadas por la misma instancia. Si conseguimos que nuestro sistema cumpla este requisito el reparto de carga podrá distribuirse mejor entre todas las instancias disponibles, ya que no será necesario enrutar todas las peticiones de la misma sesión a la misma instancia. En caso contrario, podríamos tener una instancia muy cargada, con peticiones esperando por ella, mientras otras instancias están ociosas.

Para soportar este requisito la arquitectura de software diseñada se puede apoyar en sistemas como `Redis` o `memcached`, para almacenaje de información que pueda ser consultada por cualquier instancia independientemente de quien la haya creado; o de mecanismos como `jwt`, para incluir información de sesión en los propios tokens de autenticación.







workers
  - ojo con paso de mensajes