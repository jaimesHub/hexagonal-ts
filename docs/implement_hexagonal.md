# Implement hexagonal architecture

- models/error
  - business errors
  - technical errors
- implementing from `internal` first
- interfaces: IQueryRepository, ICommandRepository
- usecase:
  - query: list/get
  - command: create/update/delete
  - usecase diagram
- Diagram
  - left side: transport (HTTP Rest, ...)
  - right side: rpc, repository, ...
- Port interfaces: ICategoryUseCase
- UseCase --impl--> Port Interfaces
- Presenter --> render html
