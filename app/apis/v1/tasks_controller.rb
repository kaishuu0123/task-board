module V1
  class TasksController < BaseController
    before_action :set_task, only: [
      :show, :update, :destroy
    ]

    def index
      tasks = if params[:project_id]
                Task.where(project_id: params[:project_id])
              else
                Task.all
              end
      render json: tasks
    end

    def create
      @task = Task.create!(task_params)
      render json: @task
    end

    def show
      render json: @task
    end

    def update
      @task.update(task_params.except(:next_task_id))
      @task.update(row_order_position: @task.row_order)
      render json: @task
    end

    def destroy
      @task.destroy
      head :no_content
    end

    def row_orders
      ids = tasks_params.map { |task_params| task_params[:id] }
      row_orders = tasks_params.map { |task_params| task_params[:row_order] }
      Task.update(id: ids, row_order: row_orders)
    end

    private
    def task_params
      params.permit(:project_id, :title, :description, :status, :row_order)
    end

    def tasks_params
      params.require(:_json).map { |task_params| task_params.permit(:id, :title, :description, :created_at, :updated_at, :project_id, :status, :row_order)}
    end

    def set_task
      @task = Task.find(params[:id])
    end
  end
end
