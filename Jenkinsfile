pipeline{
    agent any
    
    triggers{
        pollSCM('H * * * *')
    }
                
    stages{
        stage("Build project") {
            parallel {
                stage("Build API"){
                    when {
                        anyOf {
                            changeset "ToDoListShareable.Core/**"
                            changeset "ToDoListShareable.DataAccess/**"
                            changeset "ToDoListShareable.Domain/**"
                            changeset "ToDoListShareable.Security/**"
                            changeset "ToDoListShareable.WebApi/**"
                            changeset "ToDoListShareable.DataAccess.Test/**"
                        }
                    }
                    steps{
                        sh "dotnet build --configuration Release"
                        sh "docker-compose --env-file config/Test.env build api"
                    }
                }

                stage('Build Frontend') {
                    when {
                        changeset "Vue/**"
                    }
                    steps {
                        sh "docker-compose --env-file config/Test.env build web"
                    }
                }
            }

        }
        stage("Unit test"){
            steps{
                sh "dotnet test --collect:'XPlat Code Coverage'"
            }
        }
        stage("Clean containers") {
            steps {
                script {
                    try {
                        sh "docker-compose --env-file ../config/Test.env down"
                    }
                    finally { }
                }
            }
        }
        stage("Deploy") {
            steps {
                sh "docker-compose --env-file config/Test.env up -d"
            }
        }

        stage("Push to registry") {
            steps {
                sh "docker-compose --env-file config/Test.env push"
            }
        }
    }
  
}
