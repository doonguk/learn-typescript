interface Shape {
    getArea(): number
}

class Circle implements Shape{
    constructor(public radius: number){
        this.radius = radius
    }
    getArea(){
        return this.radius * this.radius * Math.PI
    }
}

class Rectangle implements Shape{
    constructor(private width: number, private height: number){
        this.width = width
        this.height = height
    }
    getArea(){
        return this.width * this.height
    }
}

const shapes: Shape[] = [new Circle(3), new Rectangle(2,3)]
shapes.forEach( shape => {
    console.log(shape.getArea())
})

