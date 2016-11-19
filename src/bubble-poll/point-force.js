export default function (fn) {
  var nodes

  function force (alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i]
      let [tx, ty, strength] = fn(node)

      strength = strength || 0.1

      node.vx += (tx - node.x) * strength * alpha
      node.vy += (ty - node.y) * strength * alpha
    }
  }

  force.initialize = function (_) {
    nodes = _
    if (!nodes) return
  }

  return force
}
