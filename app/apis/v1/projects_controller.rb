module V1
  class ProjectsController < BaseController
    before_action :set_project, only: [
      :show, :update, :destroy
    ]

    def index
      render json: Project.all.order(created_at: :desc)
    end

    def show
      render json: @project
    end

    def create
      @project = Project.create!(project_params)
      render json: @project
    end

    def update
      @project.update(project_params)
      render json: @project
    end

    def destroy
      @project.destroy
      head :no_content
    end

    private

    def project_params
      params.permit(:name, :description).merge(user: current_user)
    end

    def set_project
      @project = Project.find(params[:id])
    end
  end
end
