import { useState } from 'react';
import {
    useGetQuestionsQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    type Question
} from '../../features/quizzlogique/question';
import {
    useGetQuizzesQuery, // <-- new hook to get quizzes
    type Quizz
} from '../../features/quizzlogique/quizz';

import {
    Box, Card, CardContent, CardActions, Typography, TextField, Button, Stack, IconButton, Select, MenuItem
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify';

const QUESTION_TYPES = ["DS", "IOT", "CL", "Gl"] as const;

export default function QuestionList() {
    const { data: questions, isLoading, isError } = useGetQuestionsQuery();
    const { data: quizzes, isLoading: quizzesLoading, isError: quizzesError } = useGetQuizzesQuery();

    const [createQuestion] = useCreateQuestionMutation();
    const [updateQuestion] = useUpdateQuestionMutation();
    const [deleteQuestion] = useDeleteQuestionMutation();

    const [newText, setNewText] = useState('');
    const [newType, setNewType] = useState<Question["type"]>("DS");
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);

    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');
    const [editType, setEditType] = useState<Question["type"]>("DS");

    if (isLoading || quizzesLoading) return <Typography>Loading...</Typography>;
    if (isError || quizzesError) return <Typography color="error">Error loading data.</Typography>;

    const handleCreate = async () => {
        if (newText.trim() === '' || selectedQuizId === null) {
            toast.warning("Please enter question text and select a quiz.");
            return;
        }
        try {
            await createQuestion({
                text: newText,
                type: newType,
                quizz: selectedQuizId // <-- attach to selected quiz
            }).unwrap()
            .then(() => handleSuccess("Created successfully"))
            .catch(() => handleError("Error creating question"));
            setNewText('');
        } catch (err) {
            console.error('Failed to create question:', err);
        }
    };

    const handleUpdate = async (id: number) => {
        if (editText.trim() === '') return;
        try {
            await updateQuestion({ id, question: { text: editText, type: editType } }).unwrap()
            .then(() => handleSuccess("Updated successfully"))
            .catch(() => handleError("Error updating question"));
            setEditId(null);
            setEditText('');
        } catch (err) {
            console.error('Failed to update question:', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteQuestion(id).unwrap()
            .then(() => handleSuccess("Deleted successfully"))
            .catch(() => handleError("Error deleting question"));
        } catch (err) {
            console.error('Failed to delete question:', err);
        }
    };

    function handleSuccess(message: string) {
        toast.success(message, { position: "top-right", autoClose: 3000, theme: "dark" });
    }

    function handleError(message: string) {
        toast.error(message, { position: "top-right", autoClose: 3000, theme: "dark" });
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Questions
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mb={4}>
                <TextField
                    label="New question text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <Select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as Question["type"])}
                    size="small"
                >
                    {QUESTION_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={selectedQuizId ?? ""}
                    onChange={(e) => setSelectedQuizId(Number(e.target.value))}
                    size="small"
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Select Quiz
                    </MenuItem>
                    {quizzes?.map((quiz: Quizz) => (
                        <MenuItem key={quiz.id} value={quiz.id}>
                            {quiz.title}
                        </MenuItem>
                    ))}
                </Select>
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </Stack>

            <Stack spacing={2}>
                {questions?.map((q) => (
                    <Card key={q.id} variant="outlined">
                        <CardContent>
                            {editId === q.id ? (
                                <>
                                    <TextField
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{ mb: 1 }}
                                    />
                                    <Select
                                        value={editType}
                                        onChange={(e) => setEditType(e.target.value as Question["type"])}
                                        size="small"
                                        fullWidth
                                    >
                                        {QUESTION_TYPES.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h6">{q.text}</Typography>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {q.type}
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                        <CardActions>
                            {editId === q.id ? (
                                <>
                                    <IconButton color="success" onClick={() => handleUpdate(q.id)}>
                                        <Save />
                                    </IconButton>
                                    <IconButton
                                        color="default"
                                        onClick={() => {
                                            setEditId(null);
                                            setEditText('');
                                        }}
                                    >
                                        <Cancel />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setEditId(q.id);
                                            setEditText(q.text);
                                            setEditType(q.type);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(q.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
