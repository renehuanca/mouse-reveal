import './style.css'

interface MouseRevealConfig {
  maxSize?: number
  minSize?: number
}

const MouseReveal_CONFIG: MouseRevealConfig = {
  maxSize: 320,
  minSize: 32
}

class MouseReveal {
  private readonly mask: HTMLElement | null
  private baseX: number
  private baseY: number
  private readonly maxSize: number
  private readonly minSize: number

  constructor (element: string, config: MouseRevealConfig = {}) {
    this.mask = document.querySelector<HTMLElement>(element)

    if (!this.mask) {
      console.error('Mask element not found for the provided selector: ', element)
    }

    this.mask.style.height = `${Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        )}px`

    this.baseX = 0
    this.baseY = 0
    this.maxSize = config.maxSize ?? MouseReveal_CONFIG.maxSize
    this.minSize = config.minSize ?? MouseReveal_CONFIG.minSize

    this.setupListeners()
  }

  private setupListeners (): void {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      this.baseX = e.clientX
      this.baseY = e.clientY
      this.updateMaskPosition()
    })

    window.addEventListener('scroll', () => {
      this.updateMaskPosition()
    })

    document.querySelectorAll('.mask-effect').forEach((element: HTMLElement) => {
      element.addEventListener('mouseenter', () => this.animateMaskSize(this.minSize, this.maxSize))
      element.addEventListener('mouseleave', () => this.animateMaskSize(this.maxSize, this.minSize))
    })
  }

  private updateMaskPosition (): void {
    if (this.mask) {
      const absX = this.baseX + window.scrollX
      const absY = this.baseY + window.scrollY
      document.documentElement.style.setProperty('--mask-x', `${absX}px`)
      document.documentElement.style.setProperty('--mask-y', `${absY}px`)
    }
  }

  private animateMaskSize (startSize: number, endSize: number): void {
    const currentSize: number = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--mask-size')) || startSize
    const duration: number = 500
    const start: number = performance.now()

    const animate = (time: number): void => {
      let progress: number = (time - start) / duration
      if (progress > 1) progress = 1

      const currentMaskSize: number = currentSize + (endSize - currentSize) * progress
      document.documentElement.style.setProperty('--mask-size', `${currentMaskSize}px`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MouseReveal
} else {
  (window as any).MouseReveal = MouseReveal
}
