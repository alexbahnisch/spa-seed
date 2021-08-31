export function getBaseRef(): string {
  const element = document.getElementById('base')
  const href = element ? element.getAttribute('href') : null
  const ref = href ? href : '/'
  return ref.replace(window.location.origin, '')
}

export function upsertElement(id: string): HTMLElement {
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement('div')
    element.setAttribute('id', id)
    document.body.appendChild(element)
  }

  return element
}
