describe('<ToDo App>', () => {
  const taskDescription = "Nova Tarefa";

  beforeEach(() => {
    cy.viewport("macbook-15")
    cy.visit('http://127.0.0.1:3000/to-do')
  })

  context('Quando a aplicacao eh carregada', () => {
    it('Deve exibir o header com a logo', () => {
      cy.get('[data-testid="header"]').should("be.visible")
      cy.get('[data-testid="header-img"]').should("be.visible")
    })

    it('Deve exibir o campo de entrada e o botão para adicionar tarefas', () => {
      cy.get('[data-testid="task-input"]').should("be.visible")
      cy.get('[data-testid="create-task-button"]').should("be.visible")
    })

    it('Deve exibir mensagem indicando que nao tem tarefas cadastradas', () => {
      cy.get('[data-testid="no-content"]').should('be.visible');
    })
  })

  context('Quando adicionar uma nova tarefa', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/tasks', (req) => {
        req.continue((res) => {
          cy.wrap(res.body.id).as('taskId'); 
        });
      });

      cy.get('[data-testid="task-input"]').type(taskDescription)
      cy.get('[data-testid="create-task-button"]').click()
    })

    it('Deve exibir a nova tarefa na lista', () => {
      cy.contains(taskDescription).should('be.visible');
    })

    it('Deve limpar o campo de entrada após adicionar a tarefa', () => {
      cy.get('[data-testid="task-input"]').should('have.value', '');
    })

   
  })
})
