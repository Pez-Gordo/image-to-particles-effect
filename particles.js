const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particleArray = []

// mouse 
let mouse = {
    x: null,
    y: null,
    radius: 100
}
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x + canvas.clientLeft / 2
    mouse.y = event.y + canvas.clientTop / 2
})

function drawImage() {
    let imageWidth = png.width
    let imageHeight = png.height
    const data = ctx.getImageData(0, 0, imageWidth, imageHeight)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    class Particle {
        constructor(x, y, color, size) {
            this.x = x + canvas.width/2 - png.width * 2,
            this.y = y + canvas.height/2 - png.height * 2,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2 - png.width * 2,
            this.baseY = y + canvas.height/2 - png.height * 2,
            this.density = (Math.random() * 10) + 2
        }
        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
        }
        update() {
            ctx.fillStyle = this.color

            // collision detection
            let dx = mouse.x - this.x
            let dy = mouse.y - this.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            let forceDirectionX = dx / distance
            let forceDirectionY = dy / distance

            // max distance, past that the force will be 0
            const maxDistance = 100
            let force = (maxDistance - distance) / maxDistance
            if (force < 0) force = 0

            let directionX = (forceDirectionX * force * this.density * 0.6)
            let directionY = (forceDirectionY * force * this.density * 0.6)

            if (distance < mouse.radius + this.size) {
                this.x -= directionX
                this.y -= directionY
            } else {
                if(this.x !== this.baseX) {
                    let dx = this.x - this.baseX
                    this.x -= dx / 20
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY
                    this.y -= dy / 20
                }
            }
            this.draw()

        }
    }
    function init() {
        particleArray = []

        for (let y = 0, y2 = data.height; y < y2; y++) {
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x
                    let positionY = y
                    let color = "rgb(" + data.data[(y * 4 * data.width) + (x * 4)] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 1] + "," +
                                        data.data[(y * 4 * data.width) + (x * 4) + 2] + ")"
                    particleArray.push(new Particle(positionX * 4, positionY * 4, color))
                } 
            }
        }
    }
    function animate() {
        requestAnimationFrame(animate)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, innerWidth, innerHeight)

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update()
        }
    }
    init()
    animate()

    window.addEventListener('resize', function() {
        canvas.width = innerWidth
        canvas.height = this.innerHeight
        init()
    })
}

const png = new Image()
png.src = `data:image/png;base64,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
+dwDSqfH8xAgAAAABJRU5ErkJggg==`

window.addEventListener('load', function(event) {
    
    ctx.drawImage(png, 0, 0)
    drawImage()
})