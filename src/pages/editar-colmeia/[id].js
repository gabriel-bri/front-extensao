import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getColmeias, updateColmeia } from "../../services/api";
import { Container, TextField, Button, Typography } from "@mui/material";

export default function EditarColmeia() {
  const router = useRouter();
  const { id } = router.query;
  const { data: colmeias } = useQuery({
    queryKey: ["colmeias"],  // chave de cache
    queryFn: getColmeias,    // função que retorna os dados
  });
  const colmeia = colmeias?.find((c) => c.id === id);

  const [form, setForm] = useState({
    nome: "",
    localizacao: "",
    temperatura: "",
    umidade: "",
  });

  useEffect(() => {
    if (colmeia) {
      setForm({
        nome: colmeia.nome,
        localizacao: colmeia.localizacao,
        temperatura: colmeia.temperatura || "",
        umidade: colmeia.umidade || "",
      });
    }
  }, [colmeia]);

  const mutation = useMutation({
    mutationFn: (data) => updateColmeia(id, data),
    onSuccess: () => router.push("/"),
  });

  const handleFloatChange = (e, field) => {
    const value = parseFloat(e.target.value);
    setForm({ ...form, [field]: isNaN(value) ? "" : value });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Editar Colmeia</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <TextField
        label="Localização"
        fullWidth
        margin="normal"
        value={form.localizacao}
        onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
      />
      <TextField
        label="Temperatura"
        fullWidth
        margin="normal"
        type="number"
        value={form.temperatura}
        onChange={(e) => handleFloatChange(e, "temperatura")}
      />
      <TextField
        label="Umidade"
        fullWidth
        margin="normal"
        type="number"
        value={form.umidade}
        onChange={(e) => handleFloatChange(e, "umidade")}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => mutation.mutate(form)}
      >
        Atualizar
      </Button>
    </Container>
  );
}
