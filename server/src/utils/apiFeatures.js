export function buildQuery(ItemModel, { q, sort }) {
  let query = ItemModel.find();

  if (q && q.trim()) {
    query = query.find({
      $or: [
        { codigo: new RegExp(q, 'i') },
        { nombre: new RegExp(q, 'i') },
        { descripcion: new RegExp(q, 'i') }
      ]
    });
  }

  if (sort) {
    const sortObj = {};
    sort.split(',').forEach((field) => {
      if (field.startsWith('-')) sortObj[field.slice(1)] = -1;
      else sortObj[field] = 1;
    });
    query = query.sort(sortObj);
  } else {
    query = query.sort({ createdAt: -1 });
  }

  return query;
}