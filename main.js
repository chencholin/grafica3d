//1º DECLARAR LAS CONSTANSTES ALTO ANCHO Y MARGENES

const width = 800
const height = 500
const margin = {
    top: 0,
    bottom: 30,
    left:0, 
    right: 10
}

//definir  SVG y grupo

const svg = d3.select(".container").append("svg").attr("width", width).attr("height", height)
const elementGroup= svg.append("g").attr("id","elementGroup")
const axisGroup=svg.append("g").attr("id","axisGroup")
const xAxisGroup=axisGroup.append("g").attr("id", "xAxisGroup").attr("transform",`translate(${margin.left}, ${height-margin.bottom})`)
const yAxisGroup=axisGroup.append("g").attr("id", "yAxisGroup").attr("transform",`translate(${margin.left}, ${margin.top})`)

// ASIGNACION DE SCALAS


let x = d3.scaleLinear().range([0,width-margin.left-margin.right]); 
let y = d3.scaleBand().range([height-margin.top-margin.bottom, 0]).padding(0.1)


//Definicion de ejes

const xAxis=d3.axisBottom().scale(x)
const yAxis=d3.axisRight().scale(y)


//tratamiento de datos


let data2;

d3.csv("data.csv").then(data => {
    data.map(d => {
        d.titles = +d.titles
    })
    



 
function tratamiento(){
    resultado={} 
    data.map(d => (resultado[d.country] = resultado[d.country] + 1 || 1))
    return resultado}

    data2=tratamiento()
    
 
//dominos
    
x.domain([d3.min(d3.values(data2)), d3.max(d3.values(data2))])
y.domain(d3.keys(data2))



elementGroup.selectAll("rect").data(data)
        
.join("rect")
        .attr("class", d => d.country)
        .attr("x", 0)        
        .attr("y", (d,i) => y(d.country))
        .attr("width", d => x(d.titles))
        .attr("height", y.bandwidth())
        .attr("fill", "#8A2BE2")



//Llamada de ejes

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    
})

// CHART END



// slider:

d3.csv("data.csv").then ( datos => {
    
    

    datos.map( d => {
        d.titles= +d.titles
    })

    datos2=datos
       
    
    function slider() {    
        var sliderTime = d3
            .sliderBottom()
            .min(d3.min(d3.values(datos2)))  // rango años
            .max(d3.min(d3.values(datos2)))
            .step(4)  // cada cuánto aumenta el slider
            .width(580)  // ancho de nuestro slider
            .ticks(d3.values(datos2).length)  
            .default(d3.values(datos2)[d3.values(datos2).length -1])  // punto inicio de la marca
            .on('onchange', () => {    });
    
            var gTime = d3
            .select('div#slider-time')  // div donde lo insertamos
            .append('svg')
            .attr('width', width * 0.8)
            .attr('height', 100)
            .append('g')
            .attr('transform', 'translate(30,30)');
    
            gTime.call(sliderTime);
    
            d3.select('p#value-time').text(sliderTime.value());
    }
     
    d3.select(".box").on("click",slider)         

            
            
        
})

















