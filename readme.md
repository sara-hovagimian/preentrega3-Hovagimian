### Preentrega 3 

El proyecto tiene 3 páginas: Productos, Sucursales y Contacto.

La página Productos está desarrollada en la página index.html. Muestra los productos. Permite agregar y eliminar de un carrito, totalizando la compra con cada operación. 
Para finalizar se debe presionar “Finalizar compra”y se solicita la cantidad de cuotas, se controla la validez del dato ingresado, al ingresar un dato válido se imprime el importe a pagar,  el porcentaje de interés, el importe de cada cuota y el importe total financiado. (Se guarda el carrito en el storage).

En la página Contacto se muestra el formulario de contacto, permite ingresar los datos de la persona que se contacta y un mensaje. Una vez completado muestra mensaje por pantalla . Los datos se guardan en el storage.

En la página Sucursales se muestra un carrusel con todas las sucursales de la empresa.
Vale aclarar que los scripts presentados en las 2 entregas anteriores se incorporaron, en forma simplificada, en el archivo index.js.

### Preentrega2 del Curso de Javascript-Sara Hovagimian
**Alcance**
Es el proyecto de un sitio de venta de electrodomésticos, con venta en cuotas.
Se incluyen 2 scripts. Scritp.js corresponde a la función que se presentó en la primera entrega correspondiente al cálculo de las cuotas correspondientes a los porcentajes de interés y el importe financiado.
El script2.js corresponde al desarrollo de esta segunda entrega haciendo uso de la función del script anterior.
Se pueden elegir los productos a comprar digitando sus códigos y con el código 999, se sale (se controla que sólo se digiten los códigos previstos). 
Ingresados los productos, se muestra el total a pagar.
El pago se puede hacer en efectivo o en cuotas, con los mismos planes de financiación presentados en la Entrega 1, utilizando para los cálculos la función desarrollada en dicha entrega. 
Se muestran los productos disponibles y los porcentajes de interés correspondientes a la financiación en cuotas en la consola y en la página principal.
Se utilizó DOM para listar en la página principal los productos y la financiación.
Comentario: No logré imprimir, antes de comenzar la operatoria, el listado de productos y la financiación en la página principal. Los lista al final de la operatoria. Investigué y encontré que DOMContentLoaded puede servir, pero como aun no lo vimos no estaba segura de como usarlo.
Al finalizar el ingreso de productos se muestra, con alert, el importe a pagar sin recargo, el porcentaje correspondiente a la cantidad de cuotas elegido, el importe financiado y el importe de cada cuota.
### Electrodomésticos disponibles para la ventaElectrodomésticos disponibles para la venta
Los electrodomésticos se informan con código, descripción y precio, son los siguientes:

**Código Descripción  Precio**
101-		    Heladera-	    300000
102	-		    Cocina-			300000
103-			Lavarropa-		400000
104-			Horno-			200000
105-			Batidora-		20000
106-			Cafetera-		42000
107-			Licuadora-		33000
108-			Televisor-		450000
109-			Estufa-			18000
110-			Tostadora-		12000

### Cantidad de cuotas previstas y correspondientes porcentajes de interés

**Cantidad de cuotas	Porcentaje interés**

0- 									(Contado)	-------
1-									2%
2-									4%
3-									6%
6-									12%
12-									20%


### Preentrega1 (script.js)
Funcionalidad:
Se solicita al operador que ingrese un monto a financiar y la cantidad de cuotas. Se prevén las siguientes cuotas y recargos:
0 cuota (contado) sin recargo
1 cuota            2%
2 cuotas           4%
3 cuotas           6%
6 cuotas           12%
12 cuotas         20%

Se invoca a una función de dos parámetros,  calculoCuotas(importe, cuotas) que devuelve como resultado cuatro valores, que son:
            Importe
            Porcentaje 
            Importe cuota
           Importe financiado 
            
Se incluyen controles para que el importe y las cuotas tengan valores válidos.