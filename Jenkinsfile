// def appname = 'MarketPlace'
// def s3_bucket = 'marketplace-hosting-dev-dev'
// def app_id = 'd3owchdgc4o521'
// def BRANCH_NAME = "dev"

// Slack Notification
def gitName = env.GIT_BRANCH
def jobName = env.JOB_NAME
def branchName = env.BRANCH_NAME
// Environments Declaration
environment {
  jobName = env.JOB_NAME
  branchName = env.BRANCH_NAME
}
// Successful Build
def buildSuccess = [
  [text: "Marketplace Frontend Build Successful on ${branchName}",
  fallback: "Marketplace Frontend Build Successful on ${branchName}",
  color: "#00FF00"
  ]
]
// Failed Build
def buildError = [
  [text: "Marketplace Frontend Build Failed on ${branchName}",
  fallback: "Marketplace Frontend Build Failed on ${branchName}",
  color: "#FF0000"
  ]
]

pipeline {
  agent any 
    
  tools {nodejs "nodejs"}
    
  stages {     
    // stage('Build') {
    //   steps {
    //     sh 'npm install'
    //     sh 'npm run build'
    //   }
    // }

    stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('SonarQube') {
          script {
            def scannerHome = tool 'SonarScanner';
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }

    stage('Install Amplify CLI') {
      when {
        branch 'feature/deployment'
      }
      steps {
        script {
          sh 'npm install @aws-amplify/cli -g'
        }
      }
    }

    // stage('Verify Packages') {
    //   when {
    //     branch 'feature/deployment'
    //   }
    //   steps {
    //     script {
    //       sh 'npm run verify-packages'
    //     }
    //   }
    // }

    // stage('Build Project') {
    //   when {
    //       branch 'feature/deployment'
    //  }
    //   steps {
    //     script {
    //       sh 'npm run build'
    //   }
    // }
    //}

    // stage('Configure Amplify') {
    //   when {
    //     branch 'feature/deployment'
    // }
    //   steps {
    //     withAWS(region:'eu-west-1',credentials:'caleb-jenkins') {
    //       script {
    //         sh """
    //            amplify init \
    //            --amplify "{\"envName\":\"dev\"}" --providers "{\"awscloudformation\": {\"useProfile\":true, \"profileName\":\"default\"}}" --yes
    //            """
    //         sh 'amplify status'
    //       }
    //     }
    //   }
    // }

    // stage('Deploy to Development') {
    //   when {
    //     branch 'feature/deployment'
    //   }
    //   steps {
    //     withAWS(region:'eu-west-1',credentials:'caleb-jenkins') {
    //       script {
    //         sh 'amplify publish --invalidateCloudFront --yes'
    //       }
    //     }
    //   }
    // }

    // stage('Prepare Deploy') {
    //   when {
    //     branch 'feature/deployment'
    //   }
    //   steps {
    //     script {
    //       sh 'aws configure set default.region eu-west-1'
    //       sh 'aws amplify create-deployment'
    //       // sh 'aws amplify init --amplify {\"envName\":\"dev\"} --yes'
    //       sh 'amplify status'
    //     }
    //     withAWS(region:'eu-west-1',credentials:'caleb-jenkins') {
    //       //If no branch exists, create one
    //       BRANCH_STATUS=sh(
    //         label: "Checking branch ${BRANCH_NAME}",
    //         returnStatus: true,
    //         script: "aws amplify get-branch \
    //         --branch-name ${BRANCH_NAME} \
    //         --app-id ${app_id}"
    //       )
    //       if (BRANCH_STATUS == 225) {
    //         echo "${BRANCH_NAME} branch doesn't exist, creating new branch"
    //         sh "aws amplify create-branch \
    //         --no-enable-auto-build \
    //         --branch-name ${BRANCH_NAME} \
    //         --app-id ${app_id}"
    //       } else {
    //         //Raise exceptions
    //         if (BRANCH_STATUS != 0) {
    //           currentBuild.result = 'FAILURE'
    //           error("Error! AWS CLI ERROR #${BRANCH_STATUS}")
    //         }
    //       }
    //       script {
    //         echo appname
    //         sh """
    //             aws amplify create-deployment \
    //             --app-id ${app_id} \
    //             --branch-name dev
    //            """
    //       }
    //     }
    //   }
    // }

    // stage('Deploy To Development') {
    //   when {
    //     branch 'feature/deployment'
    //   }
    //   steps {
    //     withAWS(region:'eu-west-1',credentials:'caleb-jenkins') {
    //       script {
    //         // sh """
    //         //     aws amplify start-deployment \
    //         //     --app-id ${app_id} \
    //         //     --branch-name dev
    //         //    """
    //         sh 'amplify publish --invalidateCloudFront --yes'
    //       }
    //     }
    //   }
    // }

    stage('Clean WS') {
      steps {
        cleanWs()
      }
    }
  }

    post {
    always {
      echo 'One way or another, I have finished'
      cleanWs()
    }
    success {
      slackSend(channel: "#market-place", attachments: buildSuccess)
    }
    unstable {
      echo 'I am unstable :/'
    }
    // failure {
    //   slackSend(channel:"#market-place", attachments:buildError)
    // }
    changed {
      echo 'Things were different before...'
    }
  }
}