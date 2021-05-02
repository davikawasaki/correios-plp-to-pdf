class PostalObject {
    constructor({
        label, postService, cubage, weight,
        receiver, destination, additionalServices,
        dimension, obs
    } = {}) {
        this.label = label
        this.postService = postService
        this.cubage = cubage
        this.weight = weight
        this.receiver = receiver
        this.destination = destination
        this.additionalServices = additionalServices
        this.dimension = dimension
        this.obs = obs
    }
}
