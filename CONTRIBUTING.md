# Contributing Guide

Thank you for your interest in contributing to the Full-Stack Todo Application!

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL (or Docker)
- Git

### Development Setup

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/your-username/todo-app-phase-2.git
   cd todo-app-phase-2
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your database URL
   alembic upgrade head
   uvicorn src.main:app --reload
   ```

3. **Frontend Setup** (new terminal):
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with your API URL
   npm run dev
   ```

4. **Or use Docker Compose**:
   ```bash
   docker-compose up
   ```

## Development Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Documentation: `docs/description`

Example: `feature/add-task-categories`

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(api): add task filtering by priority

fix(ui): correct task card alignment on mobile

docs(readme): update deployment instructions
```

### Code Style

#### Backend (Python)
- Follow PEP 8
- Use type hints
- Add docstrings to functions and classes
- Run linter:
  ```bash
  flake8 src/
  black src/
  ```

#### Frontend (TypeScript)
- Follow ESLint rules
- Use TypeScript strict mode
- Add JSDoc comments
- Run linter:
  ```bash
  npm run lint
  npm run format
  ```

## Testing

### Backend Tests
```bash
cd backend
pytest
pytest --cov=src tests/  # With coverage
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## Pull Request Process

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**:
   - Write code
   - Add tests if applicable
   - Update documentation

3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

4. **Push to Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**:
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] Dependent changes merged

## Issue Guidelines

### Bug Reports

Include:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, versions)

### Feature Requests

Include:
- Clear description
- Use cases
- Proposed solution
- Alternative solutions considered

## Code Review Process

1. PRs need approval from maintainer
2. CI checks must pass
3. Address reviewer feedback
4. Squash commits before merge

## Architecture Guidelines

### Backend

```
backend/src/
├── api/          # API routes and endpoints
├── core/         # Core functionality (config, db, auth)
├── middleware/   # Custom middleware
├── models/       # SQLModel entities
└── schemas/      # Pydantic schemas
```

**Best Practices:**
- Separate routes, business logic, and data access
- Use dependency injection
- Return proper HTTP status codes
- Add comprehensive error handling
- Validate all inputs with Pydantic

### Frontend

```
frontend/
├── app/          # Next.js App Router pages
├── components/   # React components
└── lib/          # Utilities and API client
```

**Best Practices:**
- Keep components small and focused
- Use TypeScript interfaces
- Implement error boundaries
- Add loading states
- Follow React best practices

## Documentation

Update documentation when:
- Adding new features
- Changing API endpoints
- Modifying environment variables
- Updating deployment process

## Community

- Be respectful and inclusive
- Help others when possible
- Ask questions in issues
- Share knowledge

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
