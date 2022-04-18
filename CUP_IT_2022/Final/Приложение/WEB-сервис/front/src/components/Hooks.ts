export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number,
  immediate: boolean
): ((...args: Parameters<F>) => void) & { cancel: () => void } {
  let timeout: number | null = null

  const clear = () => {
    if (timeout !== null) {
      window.clearTimeout(timeout)
      timeout = null
    }
  }

  const result = (...args: Parameters<F>) => {
    const later = () => {
      timeout = null
      if (!immediate) {
        func(...args)
      }
    }

    const callNow = immediate && !timeout
    clear()

    timeout = window.setTimeout(later, wait)
    if (callNow) {
      func(...args)
    }
  }

  result.cancel = clear

  return result
}
