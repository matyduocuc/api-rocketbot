const productos = [
  { id: 1, nombre: "Teclado", precio: 15990, stock: 12 },
  { id: 2, nombre: "Mouse", precio: 8990, stock: 30 },
  { id: 3, nombre: "Monitor", precio: 129990, stock: 5 }
];

export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      const p = productos.find(x => x.id === Number(id));
      return p
        ? res.status(200).json(p)
        : res.status(404).json({ error: "Producto no encontrado" });
    }
    return res.status(200).json(productos);
  }

  if (req.method === "POST") {
    const nuevo = { id: productos.length + 1, ...req.body };
    return res.status(201).json({ mensaje: "Producto recibido", producto: nuevo });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
