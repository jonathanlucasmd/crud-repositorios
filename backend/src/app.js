const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	response.json(repositories)
});

app.post('/repositories', (request, response) => {
	try {
		const { title, url, techs } = request.body;

		if (!(title && url && techs)) {
			throw new Error('Any fields are missing');
		}
		const repository = {
			id: uuid(),
			title,
			url,
			techs,
			likes: 0,
		};
		repositories.push(repository);
		return response.json(repository);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

app.put('/repositories/:id', (request, response) => {
	const { title, url, techs } = request.body;

	const { id } = request.params;
	const repository = repositories.find(
		repository => repository.id === id
	);

	if (!repository) {
		return response.status(400).json({ error: 'Repository not found.' });
	}

	repository.title = title;
	repository.url = url;
	repository.techs = techs;

	return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  try{
    const { id } = request.params;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex == -1){
      throw new Error("Project not found.");
    }
    repositories.splice(repositoryIndex,1);
    return response.status(204).send();
  }catch(err){
    return response.status(400).json({error: err.message})
  }
	
});

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;
	const indexRepository = repositories.findIndex(
		repository => repository.id === id
	);
	if (indexRepository == -1) {
		return response.status(400).json({ error: 'Repository not found.' });
	}
	repositories[indexRepository].likes += 1;

	return response.json(repositories[indexRepository]);
});

module.exports = app;
