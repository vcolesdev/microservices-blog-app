# Kubernetes

## Notes

### Install a local Docker Registry

Instructions can be found here: https://www.paulsblog.dev/how-to-install-a-private-docker-container-registry-in-kubernetes/

### Input

```shell
# Install command
helm install -f ./registry-chart.yaml docker-registry --namespace docker-registry twuni/docker-registry
```

### Output

```shell
NAME: docker-registry
LAST DEPLOYED: Sun Jul  7 15:32:57 2024
NAMESPACE: docker-registry
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Get the application URL by running these commands:
  
  # Export POD_NAME env variable.  Set it equal to the metadata name in our docker-registry json config.
  export POD_NAME=$(kubectl get pods --namespace docker-registry -l "app=docker-registry,release=docker-registry" -o jsonpath="{.items[0].metadata.name}")
  
  # The URL to visit to see our docker-registry application.
  echo "Visit http://127.0.0.1:8080 to use your application"
  
  # Port forward namespace docker-registry to 8080:5000
  kubectl -n docker-registry port-forward $POD_NAME 8080:5000
```