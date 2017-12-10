import { quadtree } from 'd3-quadtree'

export default class NeighbourDetector {
  constructor(points) {
    this.points = points
  }

  detect(x, y, radius) {
    let qtree = quadtree(this.points, p => p.x, p => p.y)
    return this.quadNeighbours(qtree, x, y, radius)
  }

  /*
   * Find the nodes within the specified
   * circle
   * Adapted from http://bl.ocks.org/llb4ll/8709363
   */
  quadNeighbours(quadTree, cx, cy, r) {
    const x0 = cx - r,
      y0 = cy - r,
      x3 = cx + r,
      y3 = cy + r

    let result = []
    quadTree.visit((node, x1, y1, x2, y2) => {
      if (!node.length) {
        var d = Math.sqrt(
          (node.data.x - cx) * (node.data.x - cx) +
            (node.data.y - cy) * (node.data.y - cy)
        )

        if (d <= r) {
          result.push(node.data)
        }
      }

      return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0
    })

    return result
  }
}
