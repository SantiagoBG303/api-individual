function Informativa() {
  return (
    <div className="informativa-container">
      <h1>Informativa</h1>

      <p>
        Esta aplicación utiliza una API pública para mostrar chistes.
      </p>

      <img 
        src="/api-individual/image.png" 
        alt="Imagen informativa" 
        className="informativa-img"
      />
    </div>
  );
}

export default Informativa;